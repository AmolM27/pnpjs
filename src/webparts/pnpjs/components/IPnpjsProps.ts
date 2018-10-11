import { IListItem } from '../IListItem';
import { ISearchItem } from '../ISearchItem';

export interface IPnpjsProps {
  loadListItems: () => Promise<IListItem[]>;
  getSearchItems: (searchtxt) => Promise<ISearchItem[]>;
}
