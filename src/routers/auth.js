import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import {
  registerUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  refreshUserSessionCtrl,
  resetEmailCtrl,
  resetPasswordCtrl,
  getGoogleOAuthUrlCtrl,
  loginWithGoogleCtrl,
} from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserCtrl),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserCtrl),
);

router.post('/logout', ctrlWrapper(logoutUserCtrl));

router.post('/refresh', ctrlWrapper(refreshUserSessionCtrl));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(resetEmailCtrl),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordCtrl),
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlCtrl));

router.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleCtrl),
);

export default router;
