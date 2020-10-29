import * as React from 'react';
import appCssClass from './HeroNews.module.scss';
import { IHeroNewsProps, INewsPostItem } from './IHeroNewsProps';
import { NewsPostItemsDisplay } from './HeroNewsItems';
import { nullRender, Stack, Spinner } from 'office-ui-fabric-react';
import { Web } from '@pnp/sp/webs';
import moment from 'moment';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import * as commonFunctions from '../../../common/functions';
/**
 * This component handles item queries, item processing, and error message rendering. Calls child component to build item JSX for rendering.
 */
export default class HeroNews extends React.Component<IHeroNewsProps, {
  ErrorEncountered: boolean;
  ErrorMessage: string;
  NewsItemsLoaded: boolean;
  NewsItemsArray: INewsPostItem[];
  NewsRowHeight: number;
  NewsBannerImageResolution: number;
  NewsContainerWidth: number;
  NewsContentType: string;
}> {
  /**
   * @param {number} ResizeCheckIncrement This number is used to reduce the number of times setState is called due to container resize.
   */
  private ResizeCheckIncrement: number = 0;
  /**
   * This function is called by the event listener, "resize", and handles the updating of the web part container width.
   * @param {JSON} webPartBoundary Object from the WebPartContent "WebPartContext.domElement.getBoundingClientRect()"
   * @param {Event} event
   */
  public handleResize(webPartBoundary, event?: Event): event is CustomEvent {
    let CurrWebPartWidth = webPartBoundary.width;
    let ItemWidthValue = commonFunctions.GetContainerWidthBasedValue(1, CurrWebPartWidth);
    let BannerImageResolution = commonFunctions.GetContainerWidthBasedValue(2, CurrWebPartWidth);
    this.ResizeCheckIncrement += 1;
    let CurrentResizeCheckIncrement = this.ResizeCheckIncrement;
    setTimeout(() => {
      if (CurrentResizeCheckIncrement === this.ResizeCheckIncrement) {
        /** Is most recent increment, set state */
        if (this.state.NewsRowHeight === ItemWidthValue && this.state.NewsBannerImageResolution === BannerImageResolution) {
          /** Width match, do nothing */
        }
        else {
          /** Width mismatch, update state */
          this.setState({
            NewsRowHeight: ItemWidthValue,
            NewsBannerImageResolution: BannerImageResolution,
            NewsContainerWidth: CurrWebPartWidth,
          });
        }
        /** Resize handled, reset increment */
        this.ResizeCheckIncrement = 0;
      }
      else {
        /** Is old increment, do nothing */
      }
    }, 1000);
    return true;
  }
  public componentDidMount() {
    window.addEventListener('resize', (e: Event) => {
      this.handleResize(this.props.WebPartContext.domElement.getBoundingClientRect(), e);
    });
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', (e: Event) => {
      this.handleResize(this.props.WebPartContext.domElement.getBoundingClientRect(), e);
    });
  }
  /**
   * Gets items and maps values for processing and rendering.
   */
  private async GetAllNewsItems() {
    const CurrSiteWeb = Web(this.props.WebPartContext.pageContext.site.absoluteUrl);
    console.log(CurrSiteWeb);
    let AllNewsItemsArray: INewsPostItem[] = [];
    let CurrGetAllNewsItemsResponse: any[] = [];
    let QueryFilterString: string = `ContentType eq \'${this.props.contentTypeNameValue}\' and Article_x0020_Publish_x0020_Date le \'${moment().format('YYYY-MM-DD')}T23:59:59Z\' and Created gt \'${moment().subtract(1, 'year').format('YYYY-MM-DD')}T00:00:00Z\'`; //FirstPublishedDate
    let QuerySelectColumnsString = ''.concat(
      'Title,',
      'Id,',
      'FileRef,',
      'BannerImageUrl,',
      'Description,',
      'FirstPublishedDate,',
      'Created,',
      'ContentType/Id,',
      'ContentType/Name',
      '');
    CurrGetAllNewsItemsResponse = await CurrSiteWeb.lists.getByTitle("Site Pages").items
      .select(QuerySelectColumnsString)
      .expand('ContentType')
      .filter(QueryFilterString)
      .top(50)
      .orderBy('Created', false) //FirstPublishedDate
      .get()
      ;
    console.log(CurrGetAllNewsItemsResponse);
    CurrGetAllNewsItemsResponse.map(NewsPostItem => {
      let BannerImageUrlVal = '';
      let BannerImageHasURL = commonFunctions.funcCheckObjForProp(NewsPostItem.BannerImageUrl, 'Url');
      if (BannerImageHasURL === true) {
        BannerImageUrlVal = NewsPostItem.BannerImageUrl.Url.indexOf('/_layouts/15/getpreview.ashx?') === -1 ? NewsPostItem.BannerImageUrl.Url : NewsPostItem.BannerImageUrl.Url.concat('&resolution=');
      }
      else {
        BannerImageUrlVal = '/_layouts/15/images/sitepagethumbnail.png';
      }
      AllNewsItemsArray.push({
        key: `newsPostItem-${NewsPostItem.Id}-${NewsPostItem.Created}`,
        Title: NewsPostItem.Title,
        Id: NewsPostItem.Id,
        FileRef: NewsPostItem.FileRef,
        BannerImageUrl: BannerImageUrlVal,
        Description: NewsPostItem.Description,
        Created: NewsPostItem.Created,
        FirstPublishedDate: NewsPostItem.FirstPublishedDate
      });
    });
    console.log(AllNewsItemsArray);
    return AllNewsItemsArray;
  }
  /**
   * The async function that calls GetAllNewsItems to retrieve items from SharePoint. Updates state based on results. Includes error handling.
   */
  private async GetNewsItems() {
    try {
      let AllNewsItemsArray: INewsPostItem[] = await this.GetAllNewsItems();
      this.setState({
        ErrorEncountered: false,
        ErrorMessage: '',
        NewsItemsLoaded: true,
        NewsItemsArray: AllNewsItemsArray,
        NewsContentType: this.props.contentTypeNameValue
      });
    }
    catch (error) {
      this.setState({
        ErrorEncountered: true,
        ErrorMessage: `${error.toString()}`,
        NewsItemsLoaded: false,
        NewsItemsArray: [],
        NewsContentType: this.props.contentTypeNameValue
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      ErrorEncountered: false,
      ErrorMessage: '',
      NewsItemsLoaded: false,
      NewsItemsArray: [],
      NewsRowHeight: commonFunctions.GetContainerWidthBasedValue(1, this.props.WebPartContext.domElement.getBoundingClientRect().width),
      NewsBannerImageResolution: commonFunctions.GetContainerWidthBasedValue(2, this.props.WebPartContext.domElement.getBoundingClientRect().width),
      NewsContainerWidth: this.props.WebPartContext.domElement.getBoundingClientRect().width,
      NewsContentType: this.props.contentTypeNameValue
    };
    this.GetNewsItems();
  }
  public render(): React.ReactElement<IHeroNewsProps> {
    let ViewHeaderJSX: any =
      <WebPartTitle
        key={`webPartTitle-${this.props.WebPartContext.instanceId}`}
        displayMode={this.props.displayMode}
        title={this.props.webPartTitle}
        updateProperty={this.props.updateWpTitleProperty}
        className={this.props.customAppCss.webPartTitle}
        themeVariant={this.props.themeVariant}
      />
      ;
    let ViewContentJSX = null;
    // let ViewContentRowsJSX: any = [];
    let ViewRenderJSX: any;
    if (this.state.ErrorEncountered === true) {
      /** Error Encountered */
      ViewContentJSX = commonFunctions.GetMessageBarJSX(99, this.state.ErrorMessage);
    }
    else {
      if (this.state.NewsItemsLoaded === false || this.props.contentTypeNameValue !== this.state.NewsContentType) {
        /** Items not loaded, get news items */
        ViewContentJSX =
          <Stack key={`spinnerStack-${this.props.WebPartContext.instanceId}`}>
            <Spinner labelPosition='right' label='Loading...' />
          </Stack>
          ;
        this.GetNewsItems();
      }
      else {
        /** Items loaded */
        if (this.state.NewsItemsArray.length === 0) {
          /** No items found */
          ViewContentJSX = commonFunctions.GetMessageBarJSX(0);
        }
        else {
          /** Items found */
          if (this.state.NewsContainerWidth < 640 || this.props.useCarouselOnly) {
            /** Carousel View */
            ViewContentJSX =
              <NewsPostItemsDisplay
                NewsItemsCount={this.props.maxItemsInCarousel > this.state.NewsItemsArray.length ? this.state.NewsItemsArray.length : this.props.maxItemsInCarousel}
                NewsRowHeight={this.state.NewsRowHeight}
                NewsItemsArray={this.state.NewsItemsArray}
                customAppCss={this.props.customAppCss}
                BannerImageResolution={this.state.NewsBannerImageResolution}
                NewsViewMode={1}
                displayMode={this.props.displayMode}
                slidesToScroll={this.props.slidesToScroll}
                slidesToShow={this.props.slidesToShow}
                useCenterMode={this.props.useCenterMode}
              />
              ;
          }
          else {
            /** Tile View */
            ViewContentJSX =
              <NewsPostItemsDisplay
                NewsItemsCount={this.props.maxItemsInTileView > this.state.NewsItemsArray.length ? this.state.NewsItemsArray.length : this.props.maxItemsInTileView}
                NewsRowHeight={this.state.NewsRowHeight}
                NewsItemsArray={this.state.NewsItemsArray}
                customAppCss={this.props.customAppCss}
                BannerImageResolution={this.state.NewsBannerImageResolution}
                NewsViewMode={0}
                displayMode={this.props.displayMode}
                slidesToScroll={this.props.slidesToScroll}
                slidesToShow={this.props.slidesToShow}
                useCenterMode={this.props.useCenterMode}
              />
              ;
          }
        }
      }
    }
    ViewRenderJSX =
      <Stack className={appCssClass.hhHeroNews} key={`rootStack-${this.props.WebPartContext.instanceId}`}>
        {this.props.showWebPartTitle === true ? nullRender : ViewHeaderJSX}
        {ViewContentJSX}
      </Stack>
      ;
    return ViewRenderJSX;
  }
}
