import McCommand from './minecraft/McCommand';
import Echo from './misc/EchoCommand';
import Play from './misc/PlayCommand';
import Emoji from './server/EmojiCommand';
import Get from './server/GetCommand';
import Role from './server/RoleCommand';
import Add from './util/AddCommand';
import Hey from './util/HeyCommand';
import Prefix from './util/PrefixCommand';

const availableCommands = [
  McCommand,
  Echo,
  Play,
  Emoji,
  Get,
  Role,
  Add,
  Hey,
  Prefix,
];

export default availableCommands;
