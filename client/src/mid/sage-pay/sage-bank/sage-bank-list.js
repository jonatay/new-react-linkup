import { ApiList } from "../../api";
import { sageBankActions } from "./sage-bank-actions";
import { SageBank } from "./sage-bank";

const sageBankPath = "sage-pay/sage-banks";

class SageBankList extends ApiList {
  import() {
    return this.customApiCall(null, "import", {}, "post");
  }
}

export const sageBankList = new SageBankList(
  {
    // onAdd: sageBankActions.createSagebankFulfilled(),
    // onDeptChange: sageBankActions.updateSagebankFulfilled(),
    onLoad: sageBankActions.loadSageBanksFulfilled(),
    // onRemove: sageBankActions.removeSagebankFulfilled()
  },
  SageBank,
  sageBankPath
);
