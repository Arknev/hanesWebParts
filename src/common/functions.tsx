import * as React from 'react';
import { IStyle } from '@uifabric/styling';
import { ISwatchColor } from '@pnp/spfx-controls-react/lib/controls/richText/SwatchColorPickerGroup.types';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
/**
 * @description Custom colors for RTE/Quill font color palette
 * @returns {array} Array of ISwatchColor objects
 */
export const CustomRteColors: ISwatchColor[] =
  [
    {
      color: '#ffffff',
      id: 'white',
      label: 'White'
    },
    {
      color: '#000000',
      id: 'black',
      label: 'Black'
    }
  ]
  ;
/**
 * @description Generic function that checks an object for a specified property by name.
 * @param {object} varObj Object that is to be checked.
 * @param {string} varProperty Property name that will be checked for.
 * @returns {boolean} If true, then the object has the property to be checked for.
 */
export function funcCheckObjForProp(varObj, varProperty) {
  for (var varEachProperty in varObj) {
    if (varObj.hasOwnProperty(varProperty)) {
      return true;
    }
  }
  return false;
}
/**
 * @description Simple random string generator
 * @param {number} len The length of the string to be generated
 * @param {string} charSet Custom character set if set. Has default value if not set.
 * @returns
 */
export function GenRandomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var randomStringValue = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomStringValue += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomStringValue;
}
/**
 * @description Smooth scrolling implementation that is supported by modern browsers. Scrolls the current surface to specified class name.
 * @param {string} ClassToScrollTo The class to be scrolled to. Class name should be unique in page context.
 */
export function ScrollToClass(ClassToScrollTo: string) {
  document.querySelector(ClassToScrollTo).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
/**
 * @description Refreshing the current page with all QS parameters.
 */
export function FuncRefreshPage() {
  let PageUrl: string = window.location.protocol.concat('//', window.location.hostname, window.location.pathname, window.location.search);
  window.location.replace(PageUrl);
}
/**
 * @description Sends user to specified URL.
 * @param {string} URL Full URL to send user to.
 * @param {boolean} OpenInNew To open new, pass true.
 */
export function FuncGoToPage(URL?: string, OpenInNew?: boolean) {
  if (URL) {
    if (OpenInNew === true) {
      window.open(URL);
    }
    else {
      window.location.assign(URL);
    }
  }
  else {
    console.log('ERROR: No URL Found');
    return false;
  }
}
/**
 * @description Will remove the first instance of a item from an array by its value and return the update array.
 * @param {array} ArrayOfItems The array items to be processed.
 * @param {array} ItemValueToRemove The value of the item to be removed
 * @returns {array} If value is found, the updated array will be returned. If not, the original array is returned.
 */
export function RemoveItemFromArrayByValue(ArrayOfItems, ItemValueToRemove) {
  for (let index = 0; index < ArrayOfItems.length; index++) {
    const CurrArrayItem = ArrayOfItems[index];
    if (CurrArrayItem === ItemValueToRemove) {
      ArrayOfItems.splice(index, 1);
      break;
    }
  }
  return ArrayOfItems;
}
/**
 * @description Will remove the first instance of a item from an array by index and return the update array.
 * @param {array} ArrayOfItems The array items to be processed.
 * @param {array} ItemIndex The index of the item to be removed
 * @returns {array} If index is found, the updated array will be returned. If not, the original array is returned.
 */
export function RemoveItemFromArrayByIndex(ArrayOfItems, ItemIndex) {
  try {
    ArrayOfItems.splice(ItemIndex, 1);
  }
  catch (error) {
    console.log('Error in RemoveItemFromArrayByIndex');
    console.log(error);
  }
  return ArrayOfItems;
}
/**
 * Based on passed alignment value, returns value to set in CSS for the button container.
 * @param SelectedAlignVal Value of selected alignment
 * @returns CSS property value to be set for the button alignment
 */
export function GetBtnAlignment(SelectedAlignVal: string) {
  let ButtonAlignStyleVal: string = null;
  if (SelectedAlignVal === '0') {
    ButtonAlignStyleVal = 'start';
  }
  else if (SelectedAlignVal === '1') {
    ButtonAlignStyleVal = 'center';
  }
  else {
    ButtonAlignStyleVal = 'end';
  }
  return ButtonAlignStyleVal;
}
/**
 * The function will convert hex color value to RGBA values for use in CSS. Useful in adding transparency to theme colors.
 * @param {string} hexVal The hex value with #, can process 4 or 7 length strings
 * @param {number} TransparencyVal A valid transparency value: 0.01, 1.0, .55, etc... Defaults to 1.0 when undefined
 */
export function ConvertColorHexToRGB(hexVal: string, TransparencyVal?: number) {
  let r: number = null;
  let g: number = null;
  let b: number = null;
  let TransparencyStr: string = '';
  if (TransparencyVal) {
    /** Transparency value set, build string */
    TransparencyStr = `${TransparencyVal.toString()}`;
  }
  else {
    /** Transparency not set, default to 1.0 */
    TransparencyStr = '1.0';
  }
  // 3 digits
  if (hexVal.length == 4) {
    r = Number("0x" + hexVal[1] + hexVal[1]);
    g = Number("0x" + hexVal[2] + hexVal[2]);
    b = Number("0x" + hexVal[3] + hexVal[3]);
    // 6 digits
  }
  else if (hexVal.length == 7) {
    r = Number("0x" + hexVal[1] + hexVal[2]);
    g = Number("0x" + hexVal[3] + hexVal[4]);
    b = Number("0x" + hexVal[5] + hexVal[6]);
  }
  else {
    /** Invalid hex, return null */
    console.log('ConvertColorHexToRGB ERROR: Invalid Hex Value');
    return null;
  }
  return `rgba(${r.toString()}, ${g.toString()}, ${b.toString()}, ${TransparencyStr})`;
}
/**
 * Will return values based on container width. Used to determine layout dimensions and image rendition.
 * @param ValueToGet A number representing the value to return.
 * @param ContainerWidth The width of the web part container.
 * @returns A number value, type is based on ValueToGet.
 */
export function GetContainerWidthBasedValue(ValueToGet: number, ContainerWidth: number) {
  let ValueToReturn: any;
  switch (ValueToGet) {
    /** Staff Info, Birthday item width value. Adjust to column width for best display */
    case 0:
      if (ContainerWidth > 901) {
        ValueToReturn = 25;
      }
      else if (ContainerWidth > 601) {
        ValueToReturn = 33;
      }
      else if (ContainerWidth > 301) {
        ValueToReturn = 50;
      }
      else {
        ValueToReturn = 100;
      }
      break;
    /** Hero news, adjust row height based on container width. Values mirror OOB WP hero layout. */
    case 1:
      if (ContainerWidth > 1600) {
        ValueToReturn = 600;
      }
      else if (ContainerWidth > 1367) {
        ValueToReturn = 490;
      }
      else if (ContainerWidth > 1025) {
        ValueToReturn = 450;
      }
      else if (ContainerWidth > 641) {
        ValueToReturn = 400;
      }
      else {
        ValueToReturn = 400;
      }
      break;
    /** Hero news, set image rendition */
    case 2:
      if (ContainerWidth > 1600) {
        ValueToReturn = 4;
      }
      else if (ContainerWidth > 1367) {
        ValueToReturn = 4;
      }
      else if (ContainerWidth > 1025) {
        ValueToReturn = 3;
      }
      else if (ContainerWidth > 641) {
        ValueToReturn = 2;
      }
      else {
        ValueToReturn = 1;
      }
      break;
    default:
      break;
  }
  return ValueToReturn;
}
/**
 * Builds message based on selected values.
 * @param SelectedMessage The message text and type to return
 * @param MessageTextOverride Optional message text override
 * @returns MessageBar component JSX
 */
export function GetMessageBarJSX(SelectedMessage: number, MessageTextOverride?: string) {
  let currMessageText: string = 'No Items Found';
  let currMessageType: MessageBarType = MessageBarType.info;
  switch (SelectedMessage) {
    case 0:
      /** No Items Found */
      currMessageText = MessageTextOverride ? MessageTextOverride : 'No Items Found';
      break;
    case 98:
      /** Init Info Message */
      currMessageText = MessageTextOverride ? MessageTextOverride : 'Select a site to view items.';
      break;
    case 99:
      /** Error Message */
      currMessageText = MessageTextOverride ? MessageTextOverride : 'Error encountered, try again or contact site owner';
      currMessageType = MessageBarType.error;
      break;
    default:
      break;
  }
  let MessageJSX =
    <div>
      <MessageBar messageBarType={currMessageType} isMultiline={true}>
        <span>{currMessageText}</span>
      </MessageBar>
    </div>
    ;
  return MessageJSX;
}
