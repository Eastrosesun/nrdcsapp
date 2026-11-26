import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doGet, doPost } from "../../services/api-working";
import moment from 'moment';

/*********
 * createAsyncThunk
 * TAKES 3 ARGUMENTS
 *  .  URL
 *  . CALLBACK FUNCTION
 *  . OPTIONS
 */
/*******
 * <Order[], void> (TypeScript Generics):
   - Order[] (Return Type): Specifies that the asynchronous function (payload creator) will return a Promise that resolves to an array of Order objects.
   -  void (Argument Type): Indicates that this thunk does not require any input arguments when it is dispatched. 
 * 
 * 
 */
interface Order {
    id: number;
    order_number: String;
    order_status: Number;
    order_status_display: String;
    order_created_date: Date;
    customer_id: Number;
    nature_of_sample: [];
    type_of_analysis: [];
    order_completion_date: Date;
    chargeable_value: Number;
    gst: Number;
    total_amount: Number,
    payment_mode: [],
    payment_status: Number,
    payment_status_display: String;
    date_created: Date;
    date_modified: Date;
    created_by: 1,
    modified_by: 1

  // add other fields as needed
}
interface OrdersState {
  allOrders: Order[];
  loading: boolean;
  error: string;
}
export const getOrdersFromDB = createAsyncThunk<Order[], void>(
    'orders/getOrders',
    async (thunkAPI) => {
      return await doGet('orders-api/orders/');
    } 
);
const initialState: OrdersState = {
  allOrders: [],
  loading: false,
  error: '',
};
const orderSlice = createSlice({
    name: 'orders',
    initialState:initialState,
    reducers: {
        addOrders: (state: any, payload: PayloadAction<Order>) => {
            state.allOrders.push(payload.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrdersFromDB.pending, (state) => {
            state.loading = true;
            state.error = '';
        }),
        builder.addCase(getOrdersFromDB.fulfilled, (state, action) => {
            state.allOrders = action.payload
            state.allOrders.map((row: any) => {
              row['startdate'] = moment(row.order_created_date).date();
              row['startmonth'] = moment(row.order_created_date).format('MMM');;
              row['startyear'] = moment(row.order_created_date).year();
            })
        }),
         builder.addCase(getOrdersFromDB.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went wrong'
        })
    }
});
export const { addOrders } = orderSlice.actions
export default orderSlice.reducer;