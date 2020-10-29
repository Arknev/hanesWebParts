import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'HeroNewsWebPartStrings';
import HeroNews from './components/HeroNews';
import { IHeroNewsProps } from './components/IHeroNewsProps';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { override } from '@microsoft/decorators';
import { CustomCss } from '../../common/cssInJs';
export interface IHeroNewsWebPartProps {
  webPartTitle: string;
  showWebPartTitle: boolean;
  useCarouselOnly: boolean;
  maxItemsInTileView: number;
  maxItemsInCarousel: number;
  slidesToShow: number;
  slidesToScroll: number;
  useCenterMode: boolean;
  contentTypeNameValue: string;
}
export default class HeroNewsWebPart extends BaseClientSideWebPart <IHeroNewsWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  @override
  protected onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    return super.onInit();
  }
  /**
   * Update the current theme variant reference and re-render.
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
  public render(): void {
    const element: React.ReactElement<IHeroNewsProps> = React.createElement(
      HeroNews,
      {
        webPartTitle: this.properties.webPartTitle,
        showWebPartTitle: this.properties.showWebPartTitle,
        useCarouselOnly: this.properties.useCarouselOnly,
        customAppCss: CustomCss(this._themeVariant),
        WebPartContext: this.context,
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
        updateWpTitleProperty: (value: string) => { this.properties.webPartTitle = value; },
        maxItemsInTileView: this.properties.maxItemsInTileView,
        maxItemsInCarousel: this.properties.maxItemsInCarousel,
        slidesToShow: this.properties.slidesToShow,
        slidesToScroll: this.properties.slidesToScroll,
        useCenterMode: this.properties.useCenterMode,
        contentTypeNameValue: this.properties.contentTypeNameValue
      }
    );
    ReactDom.render(element, this.domElement);
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
                PropertyPaneCheckbox('showWebPartTitle', {
                  text: 'Hide Web Part Title',
                  checked: this.properties.showWebPartTitle
                }),
                PropertyPaneCheckbox('useCarouselOnly', {
                  text: 'Always Use Carousel',
                  checked: this.properties.useCarouselOnly
                }),
                PropertyPaneCheckbox('useCenterMode', {
                  text: 'Use Center Mode',
                  checked: this.properties.useCenterMode,
                  disabled: this.properties.useCarouselOnly == true ? false : true
                }),
                PropertyPaneSlider('maxItemsInTileView',{
                  label: 'Max Items in Tile View',
                  min: 1,
                  max: 5,
                  value: this.properties.maxItemsInTileView,
                  disabled: this.properties.useCarouselOnly == true ? true : false
                }),
                PropertyPaneSlider('maxItemsInCarousel',{
                  label: 'Max Items in Carousel',
                  min: 1,
                  max: 20,
                  value: this.properties.maxItemsInCarousel
                }),
                PropertyPaneSlider('slidesToShow',{
                  label: 'Max Items to Show in View',
                  min: 1,
                  max: 3,
                  value: this.properties.slidesToShow
                }),
                PropertyPaneSlider('slidesToScroll',{
                  label: 'Items to Scroll',
                  min: 1,
                  max: 3,
                  value: this.properties.slidesToScroll
                }),
                PropertyPaneTextField('contentTypeNameValue',{
                  value: this.properties.contentTypeNameValue,
                  label: "Content Type Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
