const bridge = {
    user: {
        user_id: 4,
        // token: 'edb85165-b4b6-46f0-89db-3067e5c51742'//id1
        // token: 'f87e7796-9896-4a6f-997e-11b48aebd347'//id2
        // token: '8ef96ac4-bd70-48ff-98eb-b0bcbb122c2a'//id3
        // token: '57331162-00b8-4df7-987e-17ed9a4e99a4'
        // token: '4220fab2-6021-4cbe-a7df-7f7abd33c65f'
        // token: '783ead7f-59e5-4428-9411-a6f2bf6e574c'//id20
        token: 'a1a1735b-4255-40ef-ac16-9b039c566401'//id4
    }
};
if(document.cookie) {
    try {
        document.cookie.split(/;\s+/).forEach((pair) => {
            let [k, v] = pair.split('=');
            user.cookie[k] = v;
        });
    } catch(e) {
        console.log('no user token found!');
    }
}
export default bridge;
