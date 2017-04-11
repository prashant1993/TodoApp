module.exports = {
    'facebookAuth' : {
        'clientID'      : '400556130301881', // your App ID
        'clientSecret'  : 'b900c2000e5018c96e141574d7f1b3a6', // your App Secret
        'callbackURL'   : 'http://localhost:8088/auth/facebook/callback', //cllback url,
        "profileFields" :['id', 'displayName', 'name', 'gender', 'emails','photos']
    },
    'googleAuth' : {
        'clientID'      : '990199461077-8gvrb2gsq9hqips5hiu3i2d2jvsrb4h0.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 'BIYm0lc5CyhpMxzQ5zJwurBl', // your App Secret
        'callbackURL'   : 'http://localhost:8088/auth/google/callback', //callback url
        "profileFields" :['id', 'displayName', 'name', 'gender', 'emails']
    }
};
