/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AbstractAdapter from './abstract';
import Converter from 'yarn-ui/utils/converter';

export default AbstractAdapter.extend({
  address: "timelineWebAddress",
  restNameSpace: "timelineV2",
  serverName: "ATS",

  urlForQuery(query/*, modelName*/){
    var url = this._buildURL();
    var clusterId = this.get("env.app.clusterId")
    if (clusterId) {
      url += `/clusters/${clusterId}`;
    }
    var app_attempt_id = query.app_attempt_id;
    query.fields = 'ALL';
    delete query.app_attempt_id;
    url = url + '/apps/' + Converter.attemptIdToAppId(app_attempt_id) +
        '/entities/YARN_CONTAINER';
    return url;
  },

  pathForType(/*modelName*/) {
    return '';
  }
});
