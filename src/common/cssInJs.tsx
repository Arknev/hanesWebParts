import {
  ITheme,
  mergeStyleSets,
  getTheme,
  getFocusStyle,
  FontWeights,
  IStyle
} from 'office-ui-fabric-react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface ICustomCssProps {
  announcementRowContainer: string;
  announcementTickerItemContainer: string;
  announcementTickerViewContainer: string;
  simpleFlexShrink0: string;
  tickerImageContainer: string;
  dateBlock: string;
  dateBlockMonth: string;
  dateBlockDay: string;
  simpleMinWidth0: string;
  topicHeader: string;
  topicHeaderAlt: string;
  topicHeaderInPanel: string;
  linkIconInline: string;
  webPartTitle: string;
  heroNewsBgGrad: string;
  heroNewsParallaxHost: string;
  heroNewsImageContainer: string;
  heroNewsTextContainer: string;
  heroNewsHeaderTextLarge: string;
  heroNewsHeaderTextMedium: string;
  heroNewsHeaderTextSmall: string;
  heroNewsSliderContainer: string;
  simplePaddingTopBot4: string;
  simplePaddingTopBot10: string;
  simplePadding10: string;
  simplePadding4: string;
  simpleIconContainer17: string;
  simpleIcon17: string;
  simpleIconContainer14: string;
  simpleIcon14: string;
  simpleIconContainer10: string;
  simpleIcon10: string;
  simpleFontSize32px: string;
  simpleFontSize21px: string;
}
export function CustomCss(themeVariant: IReadonlyTheme) {
  const theme: ITheme = getTheme();
  const { palette, semanticColors, fonts, spacing, effects } = theme;
  const classNames: ICustomCssProps = mergeStyleSets({
    announcementRowContainer: [
      getFocusStyle(theme, { inset: -1 }),
      {
        padding: '10px',
        cursor: 'pointer',
        selectors: {
          '&:hover': {
            background: themeVariant.semanticColors.buttonBackgroundHovered,
            color: themeVariant.semanticColors.buttonTextHovered
          },
        },
      },
    ],
    announcementTickerItemContainer: {
      padding: '10px',
      marginRight: '20px',
      cursor: 'pointer',
      selectors: {
        '&:hover': {
          background: themeVariant.semanticColors.primaryButtonBackgroundHovered,
          color: themeVariant.semanticColors.primaryButtonTextHovered
        },
      }
    },
    announcementTickerViewContainer: {
      background: themeVariant.semanticColors.primaryButtonBackground,
      color: themeVariant.semanticColors.primaryButtonText,
      padding: '0 10px'
    },
    simpleFlexShrink0: {
      flexShrink: 0,
    },
    tickerImageContainer: {
      height: '25px',
      width: '25px',
      marginRight: '5px',
    },
    dateBlock: {
      height: '50px',
      width: '50px',
      marginRight: '10px',
      border: `1px solid ${themeVariant.semanticColors.menuItemTextHovered}`,
      color: themeVariant.semanticColors.menuItemTextHovered,
      backgroundColor: themeVariant.semanticColors.menuBackground
    },
    dateBlockMonth: {
      fontSize: fonts.small.fontSize,
      textTransform: 'uppercase',
    },
    dateBlockDay: {
      fontSize: fonts.large.fontSize,
      fontWeight: FontWeights.bold,
    },
    heroNewsBgGrad: {
      background: '',
    },
    heroNewsParallaxHost:{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    heroNewsImageContainer:{
      transition: 'transform .75s cubic-bezier(.1,.2,0,1)',
      transformStyle: 'preserve-3d',
      width: '100%',
      height: '100%',
    },
    heroNewsTextContainer:{
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    heroNewsHeaderTextLarge: {
      fontSize: '32px',
      fontWeight: '100'
    },
    heroNewsHeaderTextMedium: {
      fontSize: '21px',
      fontWeight: '100'
    },
    heroNewsHeaderTextSmall: {
      fontSize: '17px',
      fontWeight: '100'
    },
    heroNewsSliderContainer:{
      height: '100%'
    },
    simpleFontSize32px: {
      fontSize: '32px',
    },
    simpleFontSize21px: {
      fontSize: '21px',
    },
    simpleMinWidth0: {
      minWidth: 0,
    },
    simpleIconContainer17: {
      height: 'auto',
      width: '17px',
      color: 'inherit'
    },
    simpleIcon17: {
      color: 'inherit',
      fontSize: '17px',
    },
    simpleIconContainer14: {
      height: 'auto',
      width: '14px',
      color: 'inherit'
    },
    simpleIcon14: {
      color: 'inherit',
      fontSize: '14px',
    },
    simpleIconContainer10: {
      height: 'auto',
      width: '10px',
      color: 'inherit'
    },
    simpleIcon10: {
      color: 'inherit',
      fontSize: '10px',
    },
    topicHeader: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      padding: '3px 5px',
      margin: '2px 4px 2px 0',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: themeVariant.semanticColors.primaryButtonText,
      backgroundColor: themeVariant.semanticColors.primaryButtonBackground,
      fontSize: fonts.small.fontSize,
      display: 'inline-block',
    },
    topicHeaderAlt: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      padding: '3px 5px',
      margin: '2px 4px 2px 0',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: themeVariant.semanticColors.bodyText,
      backgroundColor: themeVariant.semanticColors.bodyBackground,
      fontSize: fonts.small.fontSize,
      display: 'inline-block',
    },
    topicHeaderInPanel: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      padding: '3px 5px',
      margin: '2px 4px 2px 0',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: palette.themeLighterAlt,
      backgroundColor: palette.themeDark,
      fontSize: fonts.small.fontSize,
      display: 'inline-block',
    },
    linkIconInline: {
      fontSize: '9px',
      padding: '0 0 0 6px'
    },
    simplePaddingTopBot4: {
      padding: '4px 0'
    },
    simplePaddingTopBot10: {
      padding: '10px 0'
    },
    simplePadding10: {
      padding: '10px'
    },
    simplePadding4: {
      padding: '4px'
    },
    webPartTitle: {
      fontFamily: 'inherit',
      fontSize: fonts.xLarge.fontSize,
      fontWeight: FontWeights.light,
    }
  });
  return classNames;
}
