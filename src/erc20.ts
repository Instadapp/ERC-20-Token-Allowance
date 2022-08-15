import {
  Address,
  BigInt,
  Bytes,
  dataSource,
  ethereum,
  log,
} from "@graphprotocol/graph-ts";
import { Approval, ERC20, Transfer } from "../generated/ERC20/ERC20";
import {
  Account,
  ApprovalEvent,
  Token
} from "../generated/schema";
import {
  createOrLoadDsa,
  ZERO,
} from "./insta-index";

export function handleApproval(event: Approval): void {
  let token = createOrLoadToken(event);
  let accountFrom = Account.load(event.params.owner.toHexString());
  let accountTo = Account.load(event.params.spender.toHexString());

  if (accountFrom != null || accountTo != null) {
    let approvalId =
      event.transaction.hash.toHexString() +
      event.logIndex.toString();
    let approvals = createOrLoadApprovalEvent(approvalId);

    approvals.token = token.id;
    approvals.from = event.params.owner;
    approvals.to = event.params.spender;
    approvals.value = event.params.value;

    if (accountFrom != null) {
      let approvalEvents = accountFrom.approvals;
      let index = approvalEvents.indexOf(approvals.id);
      if (index == -1) {
        approvalEvents.push(approvals.id);
        accountFrom.transactionsCount = BigInt.fromI32(approvalEvents.length);
      } else {
        approvalEvents[index] = approvals.id;
      }
      accountFrom.approvals = approvalEvents;
      accountFrom.save();
    }

    if (accountTo != null) {
      let approvalEvents = accountTo.approvals;
      let index = approvalEvents.indexOf(approvals.id);
      if (index == -1) {
        approvalEvents.push(approvals.id);
        accountTo.transactionsCount = BigInt.fromI32(approvalEvents.length);
      } else {
        approvalEvents[index] = approvals.id;
      }
      accountTo.approvals = approvalEvents;
      accountTo.save();
  }
}
  token.save();

}

export function createOrLoadToken(event: ethereum.Event): Token {
  let token = Token.load(event.address.toHex());
  if (token == null) {
    let erc20 = ERC20.bind(event.address);
    token = new Token(event.address.toHex());
    let _name = erc20.try_name();
    token.name = _name.reverted ? "" : erc20.name();

    let _symbol = erc20.try_symbol();
    token.symbol = _symbol.reverted ? "" : erc20.symbol();

    let _decimal = erc20.try_decimals();
    token.decimals = _decimal.reverted ? new BigInt(0) : erc20.decimals();
    token.save();
  }
  return token;
}

export function createOrLoadApprovalEvent(id: string): ApprovalEvent {
  let approvalEvent = ApprovalEvent.load(id);
  if (approvalEvent == null) {
    approvalEvent = new ApprovalEvent(id);
  }
  return approvalEvent;
}
