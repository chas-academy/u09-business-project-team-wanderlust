import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import userModel from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config()

const clientID = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;

const callbackURL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback";

passport.use(
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL,
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                let user = await userModel.findOne({ googleId: profile.id })
                if (!user) {
                    user = await userModel.create({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails?.[0]?.value,
                    });
                }
                console.log(user);
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
