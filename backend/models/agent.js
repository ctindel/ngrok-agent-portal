const mongoose = require("mongoose");
const YAML = require("js-yaml");

var AgentSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  agentToken: {
    type: String,
    required: [true, "Agent Token cannot be empty"],
  },
  authToken: {
    type: String,
    required: [true, "Agent Auth Token cannot be empty"],
  },
  apiKey: {
    type: String,
    required: [true, "API key cannot be empty"],
  },
  agentYaml: {
    type: String,
    required: [true, "API key cannot be empty"],
    validate: {
      validator: function (value) {
        try {
          // Attempt to parse the YAML
          YAML.load(value);
          return true; // Validation succeeds if parsing is successful
        } catch (error) {
          return false; // Validation fails if there's an error during parsing
        }
      },
      message: (props) => `${props.value} is not a valid YAML format`,
    },
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
}, {_id: false });

let Agent;

if (!mongoose.models["Agent"]) {
  Agent = mongoose.model("Agent", AgentSchema);
} else {
  Agent = mongoose.models["Agent"];
}
module.exports = Agent;
