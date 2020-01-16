import React, {Fragment, useState} from 'react';
import orderService from "../services/order.service";
import {
  ExpansionPanel,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import useDebouncedInput from "../hooks/debounced-input.hook";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filterInputValue, setFilterInputValue] = useState('');
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  useDebouncedInput(
    filterInputValue,
    async () => {
      setOrders(
        await orderService.getOrder(filterInputValue),
      );
      setExpandedOrderIds([]);
    },
  );

  const getOrderPositions = async ({id, positions}) => {
    if (positions) {
      return;
    }

    const fetchedPositions = await orderService.getOrderPosition(id);

    setOrders(orders.map((order) => {
      if (order.id === id) {
        return {
          ...order,
          positions: fetchedPositions,
        };
      }

      return order;
    }));
  };

  const toggleExpansion = ({id}) => {
    if (expandedOrderIds.includes(id)) {
      return setExpandedOrderIds(
        expandedOrderIds.filter(expandedOrderId => expandedOrderId !== id),
      );
    }

    setExpandedOrderIds([...expandedOrderIds, id]);
  };

  return (
    <div>
      <form style={{marginBottom: '15px'}}>
        <TextField
          onChange={(event) => setFilterInputValue(event.target.value)}
          value={filterInputValue}
          label="Filter"/>
      </form>
      {
        orders.map((order) => {
          return (
            <ExpansionPanel expanded={expandedOrderIds.includes(order.id)}
                            onChange={_ => toggleExpansion(order)}
                            TransitionProps={{unmountOnExit: true}}
                            key={order.id}>
              <ExpansionPanelSummary
                onClick={() => getOrderPositions(order)}
                expandIcon={<ExpandMoreIcon/>}
              >
                <Typography>{`${order.docNum}, ${order.docDate}, ${order.description}`}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{flexFlow: 'column'}}>
                {
                  order.positions ? order.positions.map((position) => (
                      <Fragment key={position.id}>
                        <Typography variant="subtitle2">
                          {`${position.name}, ${position.qty}, ${position.price}, ${position.sum}`}
                        </Typography>
                        <br/>
                      </Fragment>
                    )
                  ) : <></>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
};

export default OrdersPage;
