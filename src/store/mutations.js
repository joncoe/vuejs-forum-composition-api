import { upsert, findById, docToResource } from "@/helpers";

export default {
  appendPostToThread: makeAppendChildToParentMutation({
    parent: "threads",
    child: "posts",
  }),
  appendThreadToForum: makeAppendChildToParentMutation({
    parent: "forums",
    child: "threads",
  }),
  appendThreadToUser: makeAppendChildToParentMutation({
    parent: "users",
    child: "posts",
  }),
  appendContributorToThread: makeAppendChildToParentMutation({
    parent: "threads",
    child: "contributors",
  }),
  setItem (state, { resource, item, log }) {
    if (log) console.log('setItem', resource, item)
    upsert(state[resource], docToResource(item));
  },
  addSubscription(state, {unsubscribe}) {
    state.subscriptions.push(unsubscribe)
  },
  cancelSubscriptions(state) {
    state.subscriptions = [];
  },
  setAuthId (state, id) {
    state.authId = id
  },
  setAuthUserUnsubscribe (state, unsubscribe) {
    state.authUserUnsubscribe = unsubscribe
  },
  setAuthObserverUnsubscribe (state, unsubscribe) {
    state.authObserverUnsubscribe = unsubscribe
  },
}

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId); //
    if (!resource) {
      console.error(`⚠️ ⚠️ ⚠️ ⚠️ ${child} ${childId} to ${parent} ${parentId} failed because it doesn't exist`)
      return
    }
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
