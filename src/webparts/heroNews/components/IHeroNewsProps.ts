import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ICustomCssProps } from '../../../common/cssInJs';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IHeroNewsProps {
  webPartTitle: string;
  viewMode: number;
  showWebPartTitle: boolean;
  useCarouselOnly: boolean;
  WebPartContext: WebPartContext;
  customAppCss: ICustomCssProps;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme | undefined;
  updateWpTitleProperty: (value: string) => void;
  maxItemsInTileView: number;
  maxItemsInCarousel: number;
  slidesToShow: number;
  slidesToScroll: number;
  useCenterMode: boolean;
  contentTypeNameValue: string;
  userGroupMembership: [];
  NewsRowHeight: number;
  NewsBannerImageResolution: number;
  NewsContainerWidth: number;
}
export interface INewsPostItem{
  key: string;
  Title: string;
  Id: number;
  FileRef: string;
  BannerImageUrl: string;
  Description: string;
  Created: string;
  FirstPublishedDate: string;
}
