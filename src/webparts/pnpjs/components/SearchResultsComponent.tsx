import * as React from 'react';
import { ISearchItem } from '../ISearchItem';
import styles from './Pnpjs.module.scss';

export class SearchResultsComponent extends React.Component<any, any>
{
  public render() {
    var col = (this.props.items) ? this.props.items : [];
    if (col.length > 0) {
      return (
        <div className={styles.panelStyle} >
          <div className={styles.headerCaptionStyle} >Search Results</div>
          <div className={styles.tableStyle} >

            <div className={styles.headerStyle} >
              <div className={styles.CellStyle}>Title</div>
            </div>

            {col.map(function (item, key) {

              return (<div className={styles.rowStyle} key={key}>
                <div className={styles.CellStyle}>{item.Title}</div>
              </div>);
            })}
          </div>
        </div>
      );
    }
    else
    {
      return(
        <div></div>
      );
    }
  }
}