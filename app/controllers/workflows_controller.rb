class WorkflowsController < ApplicationController
  WORKFLOW = {
    "id": 1,
    "name": "CEWEB",
    "description": "",
    "enabled": false,
    "created": "2016-12-02T19:55:58+00:00",
    "updated": "2017-02-09T13:38:46+00:00",
    "version": 2,
    "image": nil,
    "tasks": [
      {
        "id": "059c1e09-6152-40ff-afec-6cd1193a9c0f",
        "left": 750,
        "top": 245,
        "z_index": 0,
        "forms": {
          "color": {
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "value": "WARN"
          }
        },
        "version": 6,
        "operation": {
          "id": 35,
          "name": "Table visualization",
          "slug": "table-visualization"
        }
      },
      {
        "id": "2677cf9f-2b25-49b5-9648-7f484947451e",
        "left": 561,
        "top": 244,
        "z_index": 0,
        "forms": {
          "color": {
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "value": "WARN"
          }
        },
        "version": 5,
        "operation": {
          "id": 35,
          "name": "Table visualization",
          "slug": "table-visualization"
        }
      },
      {
        "id": "27f07230-74bb-48ab-96e9-38aa59ae399f",
        "left": 375,
        "top": 243,
        "z_index": 0,
        "forms": {
          "color": {
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "value": "WARN"
          }
        },
        "version": 6,
        "operation": {
          "id": 35,
          "name": "Table visualization",
          "slug": "table-visualization"
        }
      },
      {
        "id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "left": 439,
        "top": 85,
        "z_index": 0,
        "forms": {
          "color": {
            "category": "Appearance",
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "category": "Execution logging",
            "value": "WARN"
          }
        },
        "version": 6,
        "operation": {
          "id": 5,
          "name": "Filter (selection)",
          "slug": "filter-selection"
        }
      },
      {
        "id": "5e1ab752-4d0d-416b-b2d3-cc6bcbeb5877",
        "left": 271,
        "top": 10,
        "z_index": 0,
        "forms": {
          "color": {
            "category": "Appearance",
            "value": "rgb(255, 255, 165)"
          },
          "header": {
            "category": "Execution",
            "value": "0"
          },
          "log_level": {
            "category": "Execution logging",
            "value": "WARN"
          },
          "separator": {
            "category": "Execution",
            "value": ","
          },
          "infer_schema": {
            "category": "Execution",
            "value": "FROM_LIMONERO"
          }
        },
        "version": 7,
        "operation": {
          "id": 18,
          "name": "Data reader",
          "slug": "data-reader"
        }
      },
      {
        "id": "8fe7a318-6d27-4141-860f-8548fa334a3c",
        "left": 1028,
        "top": 244,
        "z_index": 0,
        "forms": {
          "color": {
            "category": "Appearance",
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "category": "Execution logging",
            "value": "WARN"
          }
        },
        "version": 6,
        "operation": {
          "id": 35,
          "name": "Table visualization",
          "slug": "table-visualization"
        }
      },
      {
        "id": "f6eb2aac-5749-4101-b759-5830bf495109",
        "left": 0,
        "top": 243,
        "z_index": 0,
        "forms": {
          "color": {
            "category": "Appearance",
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "category": "Execution logging",
            "value": "WARN"
          }
        },
        "version": 5,
        "operation": {
          "id": 35,
          "name": "Table visualization",
          "slug": "table-visualization"
        }
      },
      {
        "id": "fa05e89e-0abf-4098-bee5-df554c75fce9",
        "left": 187,
        "top": 242,
        "z_index": 0,
        "forms": {
          "color": {
            "category": "Appearance",
            "value": "rgb(255, 255, 165)"
          },
          "log_level": {
            "category": "Execution logging",
            "value": "WARN"
          }
        },
        "version": 5,
        "operation": {
          "id": 35,
          "name": "Table visualization",
          "slug": "table-visualization"
        }
      }
    ],
    "flows": [
      {
        "source_port": 35,
        "target_port": 1,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "5e1ab752-4d0d-416b-b2d3-cc6bcbeb5877",
        "target_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221"
      },
      {
        "source_port": 2,
        "target_port": 70,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "target_id": "27f07230-74bb-48ab-96e9-38aa59ae399f"
      },
      {
        "source_port": 2,
        "target_port": 70,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "target_id": "f6eb2aac-5749-4101-b759-5830bf495109"
      },
      {
        "source_port": 2,
        "target_port": 70,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "target_id": "2677cf9f-2b25-49b5-9648-7f484947451e"
      },
      {
        "source_port": 2,
        "target_port": 70,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "target_id": "059c1e09-6152-40ff-afec-6cd1193a9c0f"
      },
      {
        "source_port": 2,
        "target_port": 70,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "target_id": "8fe7a318-6d27-4141-860f-8548fa334a3c"
      },
      {
        "source_port": 2,
        "target_port": 70,
        "source_port_name": "output data",
        "target_port_name": "input data",
        "source_id": "3dbc149d-ff63-4a89-acf2-2a03343a0221",
        "target_id": "fa05e89e-0abf-4098-bee5-df554c75fce9"
      }
    ],
    "platform": {
      "id": 1,
      "name": "Spark",
      "slug": "spark",
      "description": "Apache Spark 2.0 execution platform",
      "icon": "/static/spark.png"
    },
    "user": {
      "login": "ceweb@nic.br",
      "id": 3,
      "name": "NIC CEWEB"
    }
  }
  def show
    render json: WORKFLOW
  end
end
