import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'HeroNewsWebPartStrings';
import { NewsItemsContainer } from './components/HeroNews';
import { IHeroNewsProps } from './components/IHeroNewsProps';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { override } from '@microsoft/decorators';
import { CustomCss } from '../../common/cssInJs';
import * as commonFunctions from '../../common/functions';
import { graph, Group, GroupType, Groups, IGroup, IGroupAddResult, IGroups } from "@pnp/graph/presets/all";
import { GetUserGroupMembership } from '../../services/graphcalls/GetUserGroupMembership';
export interface IHeroNewsWebPartProps {
  webPartTitle: string;
  viewMode: number;
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
  public async GetThatGraphStuffs() {
    let MyGraphTest = await GetUserGroupMembership({RequestTimeStamp:new Date()});
    console.log(' ----------------------------------------------------------------------- MyGraphTest');
    console.log(MyGraphTest);
  }
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  @override
  public onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    return super.onInit().then(_ => {
      graph.setup({
        spfxContext: this.context
      });
      this.GetThatGraphStuffs();
    });
  }
  // protected onInit(): Promise<void> {
  //   this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
  //   this._themeVariant = this._themeProvider.tryGetTheme();
  //   this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
  //   return super.onInit();
  // }
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
      NewsItemsContainer,
      {
        webPartTitle: this.properties.webPartTitle,
        viewMode: this.properties.viewMode,
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
        contentTypeNameValue: this.properties.contentTypeNameValue,
        NewsRowHeight: Number(commonFunctions.GetContainerWidthBasedValue(1, this.context.domElement.getBoundingClientRect().width)),
        NewsBannerImageResolution: Number(commonFunctions.GetContainerWidthBasedValue(2, this.context.domElement.getBoundingClientRect().width)),
        NewsContainerWidth: Number(this.context.domElement.getBoundingClientRect().width)
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
    const viewTypeOptions: IPropertyPaneDropdownOption[] = [
      { key: 1, text: 'Hero News' },
      { key: 2, text: 'Featured Articles' },
      { key: 3, text: 'Company News' },
      { key: 4, text: 'Spotlight' },
    ];
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
                PropertyPaneDropdown('viewMode', {
                  label: 'Select View Type',
                  options: viewTypeOptions,
                  selectedKey: this.properties.viewMode
                }),
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
