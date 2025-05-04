const { WatchStreamsAcademia } = require("./Academia");
const { WatchStreamsIndustry } = require("./Industry");
const { WatchStreamsProjects } = require("./Projects");
const { WatchStreamsProposal } = require("./Proposals");
const { WatchStreamsUsers } = require("./Users");
const WatchStreams = () => {
  WatchStreamsUsers();
  WatchStreamsProjects();
  WatchStreamsProposal();
  WatchStreamsIndustry();
  WatchStreamsAcademia();
};
module.exports = { WatchStreams };
