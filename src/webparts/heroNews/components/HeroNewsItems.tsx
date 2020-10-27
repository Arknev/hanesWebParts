import * as React from 'react';
import { IHeroNewsItemsProps, IHeroNewsItemBlockProps } from './IHeroNewsItemsProps';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import appCssClass from './HeroNews.module.scss';
import * as commonFunctions from '../../../common/functions';
import {
  Stack,
  Icon,
  Text,
} from 'office-ui-fabric-react';
import ClampLines from 'react-clamp-lines';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { DisplayMode } from '@microsoft/sp-core-library';
/**
 * This component builds JSX for each item block for rendering.
 */
export const NewsPostItemBlock: React.FunctionComponent<IHeroNewsItemBlockProps> = props => {
  let NewsViewJSX = null;
  let NewsItemBlockJSX = null;
  let NewsItemFontSize: string = props.customAppCss.heroNewsHeaderTextLarge;
  let AdjustBannerImageResolution: number = props.BannerImageResolution;
  if (props.BlockType === 1) {
    NewsItemFontSize = props.customAppCss.heroNewsHeaderTextLarge;
    AdjustBannerImageResolution = props.BannerImageResolution;
  }
  else if (props.BlockType === 2) {
    NewsItemFontSize = props.customAppCss.heroNewsHeaderTextMedium;
    AdjustBannerImageResolution = props.BannerImageResolution <= 1 ? props.BannerImageResolution : props.BannerImageResolution - 1;
  }
  else if (props.BlockType === 3) {
    NewsItemFontSize = props.customAppCss.heroNewsHeaderTextSmall;
    AdjustBannerImageResolution = props.BannerImageResolution <= 2 ? props.BannerImageResolution : props.BannerImageResolution - 2;
  }
  else if (props.BlockType === 4) {
    NewsItemFontSize = props.customAppCss.heroNewsHeaderTextMedium;
    AdjustBannerImageResolution = props.BannerImageResolution <= 1 ? props.BannerImageResolution : props.BannerImageResolution - 1;
  }
  NewsItemBlockJSX =
    <Stack
      key={`heroNewsItemContainer${props.NewsItemProps.Id}`}
      className={props.BlockType === 4 ? appCssClass.heroNewsCarouselItemContainer : appCssClass.heroNewsItemContainer}
      onClick={props.displayMode === DisplayMode.Read ? () => commonFunctions.FuncGoToPage(props.NewsItemProps.FileRef) : () => {}}
    >
      <div
        className={appCssClass.heroNewsImageContainer}
        style={
          {
            background: `url("${props.NewsItemProps.BannerImageUrl}${AdjustBannerImageResolution}") center / cover no-repeat`,
          }
        }
      >
      </div>
      <span className={appCssClass.heroNewsGradBackground}></span>
      <div className={`${appCssClass.heroNewsTextContainer}`}>
        <div style={{ padding: '0 28px 28px 28px' }}>
          <ClampLines
            text={props.NewsItemProps.Title}
            id={`clampLinesId-${props.NewsItemProps.Id}`}
            lines={2}
            ellipsis="..."
            className={NewsItemFontSize}
            innerElement="div"
            buttons={false}
          />
        </div>
      </div>
    </Stack>
    ;
  NewsViewJSX = NewsItemBlockJSX;
  return NewsViewJSX;
};
/**
 * This component builds the layout for items to render.
 */
export const NewsPostItemsDisplay: React.FunctionComponent<IHeroNewsItemsProps> = props => {
  let NewsViewJSX = null;
  let NewsItemsJSX = null;
  if (props.NewsViewMode === 1) {
    let CurrNewsItemJSX = null;
    let AllNewsItemsJSX = [];
    /** Carousel View */
    NewsItemsJSX =
      <div>
        <Stack>
          <Text>{props.NewsItemsArray[0].Title}</Text>
        </Stack>
      </div>
      ;
    for (let newsItemsArrIndes = 0; newsItemsArrIndes < props.NewsItemsCount; newsItemsArrIndes++) {
      const currNewsItem = props.NewsItemsArray[newsItemsArrIndes];
      CurrNewsItemJSX =
        <div>
          <div style={{ height: `${props.NewsRowHeight}px` }}>
            <NewsPostItemBlock
              BlockType={4}
              NewsItemProps={currNewsItem}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </div>
        </div>
        ;
      AllNewsItemsJSX.push(CurrNewsItemJSX);
    }
    NewsViewJSX =
      <div
        style={
          {
            position: 'relative',
            paddingBottom: '35px'
          }
        }
      >
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={false}
          adaptiveHeight={true}
          arrows={true}
          prevArrow={<Icon iconName={'ChevronLeft'} />}
          nextArrow={<Icon iconName={'ChevronRight'} />}
        >
          {AllNewsItemsJSX}
        </Slider>
      </div>
      ;
  }
  else {
    /** Tiles View */
    if (props.NewsItemsCount === 1) {
      /** One item Found */
      NewsItemsJSX =
        <Stack
          horizontal={true}
          style={
            {
              height: `${props.NewsRowHeight}px`,
              width: '100%',
              position: 'relative'
            }
          }
        >
          <Stack.Item styles={{ root: { height: '100%', width: '100%' } }}>
            <NewsPostItemBlock
              BlockType={1}
              NewsItemProps={props.NewsItemsArray[0]}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </Stack.Item>
        </Stack>
        ;
    }
    else if (props.NewsItemsCount === 2) {
      /** Two items found */
      NewsItemsJSX =
        <Stack
          horizontal={true}
          style={
            {
              height: `${props.NewsRowHeight}px`,
              width: '100%',
              position: 'relative'
            }
          }
        >
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <NewsPostItemBlock
              BlockType={1}
              NewsItemProps={props.NewsItemsArray[0]}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </Stack.Item>
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <NewsPostItemBlock
              BlockType={1}
              NewsItemProps={props.NewsItemsArray[1]}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </Stack.Item>
        </Stack>
        ;
    }
    else if (props.NewsItemsCount === 3) {
      /** Three items found */
      NewsItemsJSX =
        <Stack
          horizontal={true}
          style={
            {
              height: `${props.NewsRowHeight}px`,
              width: '100%',
              position: 'relative'
            }
          }
        >
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <NewsPostItemBlock
              BlockType={1}
              NewsItemProps={props.NewsItemsArray[0]}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </Stack.Item>
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <Stack styles={{ root: { height: '100%', width: '100%' } }}>
              <Stack.Item styles={{ root: { height: '50%', width: '100%' } }}>
                <NewsPostItemBlock
                  BlockType={2}
                  NewsItemProps={props.NewsItemsArray[1]}
                  customAppCss={props.customAppCss}
                  BannerImageResolution={props.BannerImageResolution}
                  displayMode={props.displayMode}
                />
              </Stack.Item>
              <Stack.Item styles={{ root: { height: '50%', width: '100%' } }}>
                <NewsPostItemBlock
                  BlockType={2}
                  NewsItemProps={props.NewsItemsArray[2]}
                  customAppCss={props.customAppCss}
                  BannerImageResolution={props.BannerImageResolution}
                  displayMode={props.displayMode}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
        ;
    }
    else if (props.NewsItemsCount === 4) {
      /** Four items found */
      NewsItemsJSX =
        <Stack
          horizontal={true}
          style={
            {
              height: `${props.NewsRowHeight}px`,
              width: '100%',
              position: 'relative'
            }
          }
        >
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <NewsPostItemBlock
              BlockType={1}
              NewsItemProps={props.NewsItemsArray[0]}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </Stack.Item>
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <Stack styles={{ root: { height: '100%', width: '100%' } }}>
              <Stack styles={{ root: { height: '50%', width: '100%' } }}>
                <Stack.Item styles={{ root: { height: '100%', width: '100%' } }}>
                  <NewsPostItemBlock
                    BlockType={2}
                    NewsItemProps={props.NewsItemsArray[1]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
              </Stack>
              <Stack horizontal={true} styles={{ root: { height: '50%', width: '100%' } }}>
                <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
                  <NewsPostItemBlock
                    BlockType={3}
                    NewsItemProps={props.NewsItemsArray[2]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
                <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
                  <NewsPostItemBlock
                    key={`newsItemBlock${props.NewsItemsArray[3].Id}`}
                    BlockType={3}
                    NewsItemProps={props.NewsItemsArray[3]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack.Item>
        </Stack>
        ;
    }
    else if (props.NewsItemsCount === 5) {
      /** Five items found */
      NewsItemsJSX =
        <Stack
          horizontal={true}
          style={
            {
              height: `${props.NewsRowHeight}px`,
              width: '100%',
              position: 'relative'
            }
          }
        >
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <NewsPostItemBlock
              BlockType={1}
              NewsItemProps={props.NewsItemsArray[0]}
              customAppCss={props.customAppCss}
              BannerImageResolution={props.BannerImageResolution}
              displayMode={props.displayMode}
            />
          </Stack.Item>
          <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
            <Stack styles={{ root: { height: '100%', width: '100%' } }}>
              <Stack horizontal={true} styles={{ root: { height: '50%', width: '100%' } }}>
                <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
                  <NewsPostItemBlock
                    BlockType={3}
                    NewsItemProps={props.NewsItemsArray[1]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
                <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
                  <NewsPostItemBlock
                    BlockType={3}
                    NewsItemProps={props.NewsItemsArray[2]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
              </Stack>
              <Stack horizontal={true} styles={{ root: { height: '50%', width: '100%' } }}>
                <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
                  <NewsPostItemBlock
                    BlockType={3}
                    NewsItemProps={props.NewsItemsArray[3]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
                <Stack.Item styles={{ root: { height: '100%', width: '50%' } }}>
                  <NewsPostItemBlock
                    BlockType={3}
                    NewsItemProps={props.NewsItemsArray[4]}
                    customAppCss={props.customAppCss}
                    BannerImageResolution={props.BannerImageResolution}
                    displayMode={props.displayMode}
                  />
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack.Item>
        </Stack>
        ;
    }
    else {
      /** No match */
    }
    NewsViewJSX = NewsItemsJSX;
  }
  return NewsViewJSX;
};
