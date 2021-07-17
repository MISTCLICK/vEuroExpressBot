import { Router } from 'express';
import { oauthCfg } from '../config.json';
import client from '../client';
import usersModel from '../schema/users';
import logger from '../util/logger';
import axios from 'axios';
import qs from 'qs';

let OAuthHandler = Router();

OAuthHandler.get('/', async (req, res) => {
  const code = req.query.code?.toString();
  const user_id = req.query.user_id?.toString();

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request!'
    });
  }

  try {
    const pendingUser = await usersModel.findOne({
      user_id
    });

    if (!pendingUser) {
      return res.status(404).json({ success: false });
    }

    let accessTokenData = await axios.post('https://discord.com/api/oauth2/token', qs.stringify({
      client_id: oauthCfg.client_id,
      client_secret: oauthCfg.client_secret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: oauthCfg.redirect_uri
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const guild = client.guilds.cache.get(oauthCfg.mainGuild);

    if (accessTokenData.data.access_token && guild) {
      let userData = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          "Authorization": `${accessTokenData.data.token_type} ${accessTokenData.data.access_token}`
        }
      });

      if (userData.data.id) {
        let expectedMemeber = guild.members.cache.get(userData.data.id);

        if (!expectedMemeber) {
          await guild.addMember(userData.data.id, {
            accessToken: accessTokenData.data.access_token
          });
        }

        expectedMemeber = guild.members.cache.get(userData.data.id);
        const role = guild.roles.cache.find(r => r.name === 'Pilot Community');

        if (expectedMemeber) {
          if (role) {
            expectedMemeber.roles.add(role);
          }
          expectedMemeber.setNickname(`${pendingUser.name} ${pendingUser?.surname} ${pendingUser.callsign}`);
        }

        await usersModel.findOneAndUpdate({
          user_id: pendingUser.user_id
        }, {
          discordAuth: true,
          discordID: userData.data.id
        }, {
          upsert: false
        });

        return res.status(200).json({
          success: true
        });
      } else {
        return res.status(406).json({ success: false });
      }
    } else {
      return res.status(406).json({ success: false });
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ success: false });
  }
});

export default OAuthHandler;