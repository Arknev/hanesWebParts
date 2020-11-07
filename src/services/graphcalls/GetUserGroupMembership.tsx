// import { graph } from "@pnp/graph";
// import { IGetUserGroupMembershipProps } from "./IGetUserGroupMembershipProps";
// import { useState } from "react";
// export async function GetUserGroupMembership(props: IGetUserGroupMembershipProps) {
//   // let [NewsItemsState, setNewsItemsState] = useState<INewsPostItem[]>([]); // <INewsPostItem[]>()
//   // let [UserGroupsState, setUserGroupsState] = useState(
//   //   {
//   //     UserGroupMembership: [],
//   //     LastRetrievedTime: ''
//   //   }
//   // );
//   async function GetTheUserGroups(TimeCalled: Date) {
//     const GetSomeGraphData = await graph.groups.get().then(groups => {
//       // setUserGroupsState(
//       //   {
//       //     UserGroupMembership: groups,
//       //     LastRetrievedTime: new Date().toISOString()
//       //   }
//       // );
//       return groups;
//     });
//     return GetSomeGraphData;
//   }
//   return GetTheUserGroups(props.RequestTimeStamp);
// }
