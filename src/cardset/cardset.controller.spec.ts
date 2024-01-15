import { Test, TestingModule } from "@nestjs/testing";
import { CardsetController } from "./cardset.controller";

describe("CardsetController", () => {
  let controller: CardsetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsetController],
    }).compile();

    controller = module.get<CardsetController>(CardsetController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
