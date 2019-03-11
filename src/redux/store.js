// deconstructing createStore method from redux package
// this allows us to export the creation of our store
import { createStore } from "redux"

import reducer from "./reducer";

export default createStore( reducer );