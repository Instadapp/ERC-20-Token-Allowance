import {
  Address,
  BigInt,
  Bytes,
  DataSourceContext,
} from "@graphprotocol/graph-ts";
import {
  InstaIndex,
  LogAccountCreated,
  LogNewAccount
} from "../generated/undefined/InstaIndex";
import { Account } from "../generated/schema";
import { InstaAccount } from "../generated/InstaIndex/InstaAccount";
import { InstaList } from "../generated/InstaIndex/InstaList";

export const COUNT_ID = "all";
export const ZERO = new BigInt(0);

export function handleLogAccountCreated(event: LogAccountCreated): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);
  let contract = InstaIndex.bind(event.address);
  let instaAccount = InstaAccount.bind(event.params.account);
  let instaList = InstaList.bind(contract.list());
  let accountId = instaList.accountID(event.params.account);
  if (instaAccount.version() == BigInt.fromI32(2)) {
    let dsa = createOrLoadDsa(event.params.account.toHexString());

    dsa.creator = event.params.owner;
    dsa.address = event.params.account;
    dsa.version = instaAccount.version();
    dsa.accountID = accountId;

    dsa.save();
  }
}

//loads or creates smart account
export function createOrLoadDsa(id: string): Account {
  let account = Account.load(id);
  if (account == null) {
    account = new Account(id);
    account.version = ZERO;
    account.address = new Address(0);
    account.creator = new Address(0);
    account.transactionsCount = ZERO;
    account.approvals = [];
  }
  return account;
}