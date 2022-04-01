import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { get, set } from 'lodash';
import { decode } from 'utils/jwt.utils';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nest:05HuHY7wbOZOxRaN@nest-all.gpg2a.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => {
        //Get the cookie from request
        const token = get(req, 'cookies.token');
        console.log({ token });

        //Verify the cookie
        const user = token ? decode(get(req, 'cookies.token')) : null;

        //Attach the user object to the request object
        if (user) {
          set(req, 'user', user);
        }

        return { req, res };
      },
    }),
    AuthorModule,
    BookModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
