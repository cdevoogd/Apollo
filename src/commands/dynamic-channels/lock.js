/**
 * Command - !lock
 * Allows dynamic channels to be locked, keeping random users from joining.
 */

module.exports.exec = async (config, dynamicInfo, message) => {
  const currentVC = message.member.voiceChannel;
  const dyanmicInfoResolved = await dynamicInfo;
  const dyanmicCategories = Object.keys(dyanmicInfoResolved);

  function lockChannel() {
    if (currentVC && dyanmicCategories.includes(currentVC.parentID)) {
      currentVC.overwritePermissions(message.guild.defaultRole, { CONNECT: false });
      currentVC.overwritePermissions(config.adminRoleID, { CONNECT: true });
      message.react('🔒');
    }
  }

  if (config.commands.lock.commandChannelOnly) {
    if (message.channel.name === config.botCommandsChannel) {
      lockChannel();
    }
    return;
  }
  lockChannel();
};