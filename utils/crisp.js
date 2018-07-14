// https://help.crisp.chat/en/article/how-to-use-dollarcrisp-javascript-sdk-10ud15y/
const openChatBox = () => {
  if (window.$crisp) {
    $crisp && $crisp.push(['do', 'chat:open']);
  }
};

export { openChatBox };
