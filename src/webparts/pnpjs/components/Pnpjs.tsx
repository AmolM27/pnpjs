import * as React from 'react';
import styles from './Pnpjs.module.scss';
import { IPnpjsProps } from './IPnpjsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from '../IListItem';
import { DefaultButton, autobind, TextField, PrimaryButton } from 'office-ui-fabric-react';
import { ISearchItem } from '../ISearchItem';
import { SearchResultsComponent } from './SearchResultsComponent';
import { sp, SearchResults } from '@pnp/sp';

export interface IComponentState {
  searchtxt: string;
}

export default class Pnpjs extends React.Component<IPnpjsProps, any> {

  constructor(props: IPnpjsProps, state: IComponentState) {
    super(props)
    this.state = ({
      searchtxt: '',
      results: []
    })
  }

  public render(): React.ReactElement<IPnpjsProps> {
    return (
      <div className={styles.pnpjs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <DefaultButton
                text="Load list items"
                title="Load list items"
                onClick={this._loadListItems} />
              <br />
              <div className="ms-Grid" ms-bgColor-themePrimary="#004578">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <TextField value={this.state.searchtxt} onChanged={e => this.setState({ searchtxt: e })} />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <DefaultButton
                      text="Search items"
                      title="Search items"
                      onClick={this._searchItems} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SearchResultsComponent items={this.state.results} />
        </div>
      </div>
    );
  }

  @autobind
  private async _loadListItems(): Promise<void> {
    const items: IListItem[] = await this.props.loadListItems();
    //console.log(items);
  }

  @autobind
  private async _searchItems(): Promise<void> {
    const items: ISearchItem[] = await this.props.getSearchItems(this.state.searchtxt);
    console.log(items);
    this.setState({ results: items });
  }
}
