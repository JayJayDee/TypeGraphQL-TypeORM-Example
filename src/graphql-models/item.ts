import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

enum ItemType {
  HEAL_POTION = 'HEAL_POTION',
  ANTI_PARALYSIS_POTION = 'ANTI_PARALYSIS_POTION',
  ANTI_POISON_POTION = 'ANTI_POISON_POTION',
  RESSURECTION_POTION = 'RESSURECTION_POTION',
  POKEBALL = 'POKEBALL'
}

enum ConsumeType {
  CONSUMABLE = 'CONSUMABLE',
  EQUIPMENT = 'EQUIPMENT'
}

registerEnumType(ItemType, {
  name: 'ItemType',
  description: 'the type of item. (potion or pokeball..)'
});

registerEnumType(ConsumeType, {
  name: 'ConsumeType',
  description: 'CONSUMABLE or EQUIPMENT'
});

@ObjectType()
export class Item {

  @Field(type => ID)
  public id: string;

  @Field()
  public name: string;

  @Field(type => ItemType)
  public itemType: ItemType;

  @Field(type => ConsumeType)
  public consumeType: ConsumeType;
}