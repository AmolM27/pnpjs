import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnpjsWebPartStrings';
import Pnpjs from './components/Pnpjs';
import { IPnpjsProps } from './components/IPnpjsProps';

import {sp, SearchResults} from "@pnp/sp"
import { IODataListItem } from '@microsoft/sp-odata-types';
import { IListItem } from './IListItem';
import { ISearchItem } from './ISearchItem';

export interface IPnpjsWebPartProps {
  description: string;
}

export default class PnpjsWebPart extends BaseClientSideWebPart<IPnpjsWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    })
  }

  public render(): void {
    const element: React.ReactElement<IPnpjsProps > = React.createElement(
      Pnpjs,
      {
        loadListItems: this.loadListItems,
        getSearchItems: this.getSearchItems
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private async loadListItems(): Promise<IListItem[]> {
    const result: IListItem[] = await sp.web.lists.getByTitle("Key Contacts").items.select("Title").orderBy("Title", true).top(100).get();
    return(result);
  }

  private async getSearchItems(searchtext): Promise<ISearchItem[]> {
    var items: ISearchItem[] = [];
    //alert("Searchtext: " + searchtext)
    await sp.search(searchtext).then((result : SearchResults) => {
      var props = result.PrimarySearchResults;
      //console.log(props);
       //var propValue = "";
    
       props.forEach(function(object) {
        //propValue += counter++ +'. Title - ' +object.Title +"<br/>"+"Rank - " + object.Rank +"<br/>"+"File Type -  " + object.FileType+"<br/>"+ "Original Path - " +object.OriginalPath +"<br/>"+" Summary - "+ object.HitHighlightedSummary + "<br/>"+"<br/>";
        var item: ISearchItem = { Title: object.Title  }
        items.push(item);
       });
       //console.log(items);
       }).catch(function(err) {
        console.log("Error: " + err);   
       });
       return (items);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
