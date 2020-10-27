/**
 * @description Simple random string generator
 * @param {number} len The length of the string to be generated
 * @param {string} charSet Custom character set if set. Has default value if not set.
 * @returns
 */
export function GenRandomString(len, charSet){
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
export function ScrollToClass(ClassToScrollTo: string){
  document.querySelector(ClassToScrollTo).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
/**
 * @description Refreshing the current page with all QS parameters.
 */
export function FuncRefreshPage(){
  let PageUrl: string = window.location.protocol.concat('//', window.location.hostname, window.location.pathname, window.location.search);
  window.location.replace(PageUrl);
}
/**
 * @description Sends user to specified URL.
 * @param {string} URL Full URL to send user to.
 * @param {boolean} OpenInNew To open new, pass true.
 */
export function FuncGoToPage(URL:string, OpenInNew?:boolean){
  if(OpenInNew === true){
    window.open(URL);
  }
  else{
    window.location.assign(URL);
  }
}
/**
 * @description Will remove the first instance of a item from an array by its value and return the update array.
 * @param {array} ArrayOfItems The array items to be processed.
 * @param {array} ItemValueToRemove The value of the item to be removed
 * @returns {array} If value is found, the updated array will be returned. If not, the original array is returned.
 */
export function RemoveItemFromArrayByValue(ArrayOfItems, ItemValueToRemove){
  for (let index = 0; index < ArrayOfItems.length; index++) {
    const CurrArrayItem = ArrayOfItems[index];
    if(CurrArrayItem === ItemValueToRemove){
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
export function RemoveItemFromArrayByIndex(ArrayOfItems, ItemIndex){
  try {
    ArrayOfItems.splice(ItemIndex,1);
  }
  catch (error) {
    console.log('Error in RemoveItemFromArrayByIndex');
    console.log(error);
  }
  return ArrayOfItems;
}
export function GetPreConfigString(StringToGet){
  let SelectedValue: string = null;
  switch (StringToGet) {
    case 0:
      /** 0 must be the absolute URL to the Hub Site */
      SelectedValue = 'https://broadridge.sharepoint.com/sites/main/';
      break;
    case 1:
      /** 1 must be the name of the My Tools list */
      SelectedValue = 'Intranet Tools';
      break;
    case 2:
      /** 2 must be the name of the custom property in the user profile that stores the users selected tools */
      SelectedValue = 'brMyToolsPersonalization';
      break;
    case 3:
      /** 3 must be the name of the Footer Links list in the Intranet Hub Site */
      SelectedValue = 'Intranet Footer Links';
      break;
    case 4:
      /** 4 must be the name of the Footer Message list in the Intranet Hub Site */
      SelectedValue = 'Intranet Footer Message';
      break;
    case 5:
      /** 5 must be the absolute URL to SEARCH HR CONNECT */
      SelectedValue = 'https://hrconnect.broadridge.com';
      break;
    case 6:
      /** 6 must be the name of the Intranet */
      SelectedValue = 'My Broadridge';
      break;
    case 7:
      /** 7 must be the absolute URL to the Manage Tools Page */
      SelectedValue = 'https://broadridge.sharepoint.com/sites/main/SitePages/MyTools/manageMyTools.aspx';
      break;
    case 8:
      /** 8 must be the absolute URL to the All Tools View */
      SelectedValue = 'https://broadridge.sharepoint.com/sites/main/SitePages/MyTools/viewAllTools.aspx';
      break;
     case 9:
      /** 9 must be the style element ID */
      SelectedValue = 'brCssOverridesSet2';
      break;
   default:
      break;
  }
  return SelectedValue;
}
