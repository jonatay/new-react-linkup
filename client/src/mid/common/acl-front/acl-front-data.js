import { aclFrontActions } from "./acl-front-actions";
import { FirebaseAclData } from "../../firebase";

export const aclFrontData = new FirebaseAclData({
  onLoad: aclFrontActions.aclOnLoad,
  onAdd: aclFrontActions.aclOnAdd,
  onChange: aclFrontActions.aclOnChange,
  onRemove: aclFrontActions.aclOnRemove,
});
