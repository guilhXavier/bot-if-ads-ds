import { TOKEN_EXPIRY_MILLISECONDS } from '../constants';

const isTokenExpiredFromTime = (createdAt: Date): boolean => {
  return (
    new Date(createdAt.getTime() + TOKEN_EXPIRY_MILLISECONDS).getTime() <
    Date.now()
  );
};

export { isTokenExpiredFromTime };
