import * as React from 'react';
import { useEffect, useState } from 'react';
import appCssClass from './HeroNews.module.scss';
import { IHeroNewsProps, INewsPostItem } from './IHeroNewsProps';
import { NewsPostItemsDisplay } from './HeroNewsItems';
import { nullRender, Stack, Spinner } from 'office-ui-fabric-react';
import { Web } from '@pnp/sp/webs';
import moment, { Moment } from 'moment';
import { sp, ISearchQuery, SearchResults, SearchQueryBuilder, ISort, ISearchBuilder, SortDirection } from "@pnp/sp/presets/all";
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import * as commonFunctions from '../../../common/functions';
export function NewsItemsContainer(props: IHeroNewsProps) {
  // let [NewsItemsState, setNewsItemsState] = useState<INewsPostItem[]>([]); // <INewsPostItem[]>()
  let [NewsItemsState, setNewsItemsState] = useState(
    {
      NewsContentType: props.contentTypeNameValue,
      NewsItems: [],
      NewsItemsLoaded: false,
      ErrorEncountered: false,
      ErrorMessage: 'No Error'
    }
  );
  let [NewsResizeState, setNewsResizeState] =
    useState(
      {
        NewsRowHeight: props.NewsRowHeight,
        NewsBannerImageResolution: props.NewsBannerImageResolution,
        NewsContainerWidth: props.NewsContainerWidth
      }
    );
  useEffect(() => {
    // const DateNowISO: string = new Date().toISOString(); /** DEV: Ensure filter includes limiting items by created or firstpublish date */
    const DateOneYearAgoSTRING: string = `${moment().subtract(1, 'year').format('YYYY-MM-DD')}T00:00:00Z`;
    let AllNewsItemsArray: INewsPostItem[] = [];
    try {
      let SearchSortOrder: ISort = { Property: 'Created', Direction: SortDirection.Descending };
      let SearchQuery: ISearchBuilder = SearchQueryBuilder()
        .text(`ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C411800FB9AAD815DBE334BBAAD6D00312373BD* AND Created>${DateOneYearAgoSTRING}`)
        .trimDuplicates
        .enableSorting
        .sortList(SearchSortOrder)
        .selectProperties(
          'PageID',
          'ListItemID',
          'ListID',
          'Title',
          'PictureThumbnailURL',
          'Description',
          'ModernAudienceAadObjectIds',
          'IsAudienceTargeted',
          'Path',
          'LikeCountLifetime',
          'LikesCount',
          'ows_LikesCount',
          'Audiences',
          'Created',
          'FirstPublishedDate',
          'ViewCount',
          'ViewerCount',
          'ViewsLastMonths3',
          'BannerImageUrlOWSURLH',
          'ArticlePublishDateOWSDATE',
          'FirstPublishedDateOWSDATE',
          'PublishStartDateOWSDATE',
          'ows_q_DATE_ArticlePublishDate',
          'BannerUrlOWSURLH')
        .rowLimit(100)
        ;
      sp.search(SearchQuery)
        .then(SearchQueryResponse => {
          console.log(SearchQueryResponse.PrimarySearchResults);
          SearchQueryResponse.PrimarySearchResults.map((currNewsItem: any) => {
            let BannerImageUrlVal: string = '';
            if (currNewsItem.BannerImageUrlOWSURLH !== null) {
              // let BannerImageHasUrlValue = currNewsItem.BannerImageUrl['Url'];
              let BannerImageStringSplit = currNewsItem.BannerImageUrlOWSURLH.split(',')[0];
              BannerImageUrlVal = BannerImageStringSplit.indexOf('/_layouts/15/getpreview.ashx?') === -1 ? BannerImageStringSplit : BannerImageStringSplit.concat('&resolution=');
            }
            else {
              BannerImageUrlVal = '/_layouts/15/images/sitepagethumbnail.png';
            }
            /** Check for group ID matches */
            AllNewsItemsArray.push({
              key: `newsPostItem-${currNewsItem.ListItemID}-${currNewsItem.Created}`,
              Title: currNewsItem.Title,
              Id: currNewsItem.Id,
              FileRef: currNewsItem.Path,
              BannerImageUrl: BannerImageUrlVal,
              Description: currNewsItem.Description,
              Created: currNewsItem.Created,
              FirstPublishedDate: currNewsItem.ArticlePublishDateOWSDATE,
              Audiences: currNewsItem.Audiences
            });
          });
          console.log('AllNewsItemsArray');
          console.log(AllNewsItemsArray);
          setNewsItemsState(
            {
              NewsContentType: props.contentTypeNameValue,
              NewsItems: AllNewsItemsArray,
              NewsItemsLoaded: true,
              ErrorEncountered: false,
              ErrorMessage: 'No Error'
            }
          );

        });
    }
    catch (error) {
      setNewsItemsState(
        {
          NewsContentType: props.contentTypeNameValue,
          NewsItems: [],
          NewsItemsLoaded: false,
          ErrorEncountered: false,
          ErrorMessage: `${error.toString()}`
        }
      );
    }
  }, [props.contentTypeNameValue, props.viewMode]);
  /**
   * @param {number} ResizeCheckIncrement
   * @description This value incremented each time a resize event is fired.
   */
  let ResizeCheckIncrement: number = 0;
  /**
   * @param {object} webPartBoundary The element rect object from WebPartContext.domElement.getBoundingClientRect()
   * @description Handles resizing and associated state changes. Screen size must be unchanged for 1 sec before state is updated.
   */
  function handleResize(webPartBoundary) {
    ResizeCheckIncrement += 1;
    let CurrentResizeCheckIncrement = ResizeCheckIncrement;
    setTimeout(() => {
      if (CurrentResizeCheckIncrement === ResizeCheckIncrement) {
        // console.log(' ---------------------------------- webPartBoundary');
        // console.log(webPartBoundary);
        let CurrWebPartWidth = webPartBoundary.width;
        let ItemWidthValue = commonFunctions.GetContainerWidthBasedValue(1, CurrWebPartWidth);
        let BannerImageResolution = commonFunctions.GetContainerWidthBasedValue(2, CurrWebPartWidth);
        setNewsResizeState(
          {
            NewsRowHeight: ItemWidthValue,
            NewsBannerImageResolution: BannerImageResolution,
            NewsContainerWidth: CurrWebPartWidth
          }
        );
        /** Resize handled, reset increment */
        ResizeCheckIncrement = 0;
      }
      else {
        /** Is old increment, do nothing */
      }
    }, 1000);
  }
  useEffect(() => {
    window.addEventListener('resize', (e: Event) => {
      handleResize(props.WebPartContext.domElement.getBoundingClientRect());
    });
    return () => {
      window.removeEventListener('resize', (e: Event) => {
        handleResize(props.WebPartContext.domElement.getBoundingClientRect());
      });
    };
  }, []);
  let ViewHeaderJSX: any =
    <WebPartTitle
      key={`webPartTitle-${props.WebPartContext.instanceId}`}
      displayMode={props.displayMode}
      title={props.webPartTitle}
      updateProperty={props.updateWpTitleProperty}
      className={props.customAppCss.webPartTitle}
      themeVariant={props.themeVariant}
    />
    ;
  let ViewContentJSX: any;
  let ViewRenderJSX: any;
  if (NewsItemsState.ErrorEncountered === true) {
    /** Error Encountered */
    ViewContentJSX = commonFunctions.GetMessageBarJSX(99, NewsItemsState.ErrorMessage);
  }
  else {
    if (props.contentTypeNameValue !== NewsItemsState.NewsContentType || NewsItemsState.NewsItemsLoaded === false || props.userGroupMembershipLoaded !== true) {
      /** Items not loaded, get news items */
      ViewContentJSX =
        <Stack key={`spinnerStack-${props.WebPartContext.instanceId}`}>
          <Spinner labelPosition='right' label='Loading...' />
        </Stack>
        ;
    }
    else {
      /** Items loaded */
      let ProcessedNewsItems = NewsItemsState.NewsItems;
      console.log(' before ------------------------------------------ProcessedNewsItems');
      console.log(ProcessedNewsItems);
      if (NewsItemsState.NewsItems.length === 0) {
        /** No items found */
        ViewContentJSX = commonFunctions.GetMessageBarJSX(0);
      }
      else {
        /** Items found, loop over items to check for audience */
        for (let NewsItemsArrayIndex = 0; NewsItemsArrayIndex < NewsItemsState.NewsItems.length; NewsItemsArrayIndex++) {
          const CurrNewsItem = NewsItemsState.NewsItems[NewsItemsArrayIndex];
          if (CurrNewsItem.Audiences == null || CurrNewsItem.Audiences == '') {
            /** Audiences not found for post, show to all users */
          }
          else {
            let PostIsOkForUser: boolean = false;
            for (let UserGroupIdArrayIndex = 0; UserGroupIdArrayIndex < props.userGroupMembership.length; UserGroupIdArrayIndex++) {
              const CurrGroupId = props.userGroupMembership[UserGroupIdArrayIndex];
              /** Check for audience id match */
              let GroupIdMatchFound = CurrGroupId.toUpperCase().indexOf(CurrNewsItem.Audiences) >= 0 ? true : false;
              if (GroupIdMatchFound === true) {
                /** Audience match found, set true and end loop */
                PostIsOkForUser = true;
                break;
              }
            }
            if (PostIsOkForUser !== true) {
              /** Audience present and no match found, remove post from array */
              ProcessedNewsItems = commonFunctions.RemoveItemFromArrayByIndex(ProcessedNewsItems, NewsItemsArrayIndex);
            }
          }
        }
        console.log(' after ------------------------------------------ProcessedNewsItems');
        console.log(ProcessedNewsItems);
        if (NewsResizeState.NewsContainerWidth < 640 || props.useCarouselOnly) {
          /** Carousel View */
          ViewContentJSX =
            <NewsPostItemsDisplay
              NewsItemsCount={props.maxItemsInCarousel > NewsItemsState.NewsItems.length ? NewsItemsState.NewsItems.length : props.maxItemsInCarousel}
              NewsRowHeight={NewsResizeState.NewsRowHeight}
              NewsItemsArray={ProcessedNewsItems}
              customAppCss={props.customAppCss}
              BannerImageResolution={NewsResizeState.NewsBannerImageResolution}
              NewsViewMode={1}
              displayMode={props.displayMode}
              slidesToScroll={props.slidesToScroll}
              slidesToShow={props.slidesToShow}
              useCenterMode={props.useCenterMode}
            />
            ;
        }
        else {
          /** Tile View */
          ViewContentJSX =
            <NewsPostItemsDisplay
              NewsItemsCount={props.maxItemsInTileView > NewsItemsState.NewsItems.length ? NewsItemsState.NewsItems.length : props.maxItemsInTileView}
              NewsRowHeight={NewsResizeState.NewsRowHeight}
              NewsItemsArray={ProcessedNewsItems}
              customAppCss={props.customAppCss}
              BannerImageResolution={NewsResizeState.NewsBannerImageResolution}
              NewsViewMode={0}
              displayMode={props.displayMode}
              slidesToScroll={props.slidesToScroll}
              slidesToShow={props.slidesToShow}
              useCenterMode={props.useCenterMode}
            />
            ;
        }
      }
    }
  }
  let GroupIdsJSX = [];
  console.log('props.userGroupMembership');
  console.log(props.userGroupMembership);
  props.userGroupMembership.forEach(currGroupItem => {
    let currGroupItemJSX = <div>{currGroupItem}</div>;
    GroupIdsJSX.push(currGroupItemJSX);
  });
  ViewRenderJSX =
    <Stack className={appCssClass.hhHeroNews} key={`rootStack-${props.WebPartContext.instanceId}`}>
      {props.showWebPartTitle === true ? nullRender : ViewHeaderJSX}
      {ViewContentJSX}
      <div>
        <h3>{'Dev Notes: Audiences Found for User'}</h3>
        {GroupIdsJSX}
      </div>
    </Stack>
    ;
  return <div>{ViewRenderJSX}</div>;
}
