#!/usr/bin/env python3

import connexion

from openapi_server import config_test
from openapi_server.controllers import security_controller_, user_controller

app = config_test.connex_app
app.add_api('openapi.yaml')

# Add authorization endpoints
app.add_url_rule('/users', 'create_user', user_controller.create_user, methods=['POST'])
app.add_url_rule('/login', 'login', security_controller_.login, methods=['POST'])

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
