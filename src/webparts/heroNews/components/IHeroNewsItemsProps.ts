import { INewsPostItem } from './IHeroNewsProps';
import { ICustomCssProps } from '../../../common/cssInJs';
import { DisplayMode } from '@microsoft/sp-core-library';
export interface IHeroNewsItemsProps {
  NewsItemsCount: number;
  NewsRowHeight: number;
  NewsItemsArray: INewsPostItem[];
  customAppCss: ICustomCssProps;
  BannerImageResolution: number;
  NewsViewMode: number;
  displayMode: DisplayMode;
  slidesToShow: number;
  slidesToScroll: number;
  useCenterMode: boolean;
}
export interface IHeroNewsItemBlockProps {
  BlockType: number;
  NewsItemProps: INewsPostItem;
  customAppCss: ICustomCssProps;
  BannerImageResolution: number;
  displayMode: DisplayMode;
}
