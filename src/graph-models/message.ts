import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class ImageContent {
  @Field()
  imageUrl: string;

  @Field()
  thumbUrl: string;
}

@ObjectType()
export class Message {
  @Field(type => ID)
  id: number;

  @Field({ nullable: true })
  text?: string;

  @Field(type => ImageContent, { nullable: true })
  image?: ImageContent;

  @Field()
  publishDate: Date;
}