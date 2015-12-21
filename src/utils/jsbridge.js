const bridge = {
    user: {
        // user_id: 2,
        // token: 'f87e7796-9896-4a6f-997e-11b48aebd347'
    }
};
if(document.cookie) {
    try {
        document.cookie.split(/;\s+/).forEach((pair) => {
            let [k, v] = pair.split('=');
            bridge.user[k] = v;
        });
    } catch(e) {
        console.log('no user token found!');
    }
}
export default bridge;
