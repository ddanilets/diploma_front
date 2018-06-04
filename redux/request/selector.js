export default function getRequestState(state, name) {
  return state.request[name] || {};
}
