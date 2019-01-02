/**
 * Created by LuKa on 2019-01-02.
 * Web module
 */

'use strict';

const name = 'website';
const version = '1.0.0';

const register = async (server, config) => {
    server.log('info', `Registering plugin ${name} v.${version}`);

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: () => {
                return 'Hello World!';
            }
        }
    ]);
};

exports.plugin = { register, name, version };
