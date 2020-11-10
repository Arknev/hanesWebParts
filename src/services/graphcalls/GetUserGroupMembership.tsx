import { IGetUserGroupMembershipProps } from "./IGetUserGroupMembershipProps";
import { useState } from "react";
import { graph, Group, GroupType, Groups, IGroup, IGroupAddResult, IGroups } from "@pnp/graph/presets/all";
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { sp } from "@pnp/sp/presets/all";
import { isArray } from '@pnp/common';
export async function GetUserGroupMembership(props: IGetUserGroupMembershipProps) {
  // let [NewsItemsState, setNewsItemsState] = useState<INewsPostItem[]>([]); // <INewsPostItem[]>()
  // let [UserGroupsState, setUserGroupsState] = useState(
  //   {
  //     UserGroupMembership: [],
  //     LastRetrievedTime: ''
  //   }
  // );
  let GroupsFromGraphArray = [];
  await props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): any => {
    client
      .api('/me/transitiveMemberOf')
      .header('ConsistencyLevel', 'eventual')
      .select('id')
      .version('v1.0')
      .get((graphCallError, graphCallGroups, graphCallRawResponse?: any) => {
        if (graphCallError) {
          console.log('graphCallError');
          console.log(graphCallError);
        }
        else if (graphCallGroups !== undefined) {
          console.log('graphCallGroups');
          console.log(graphCallGroups.value);
          if (isArray(graphCallGroups.value)) {
            for (let MembershipIndex = 0; MembershipIndex < graphCallGroups.value.length; MembershipIndex++) {
              const currGroupItem = graphCallGroups.value[MembershipIndex];
              GroupsFromGraphArray.push(currGroupItem.id);
            }
          }
        }
        else {
          console.log('nothing returned');
        }
        console.log(' -------------------------------------------- svc GroupsFromGraphArray');
        console.log(GroupsFromGraphArray);
      });
  });
  return GroupsFromGraphArray;
}
