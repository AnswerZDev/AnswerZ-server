import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {SignupUserDto} from "./dto/signup-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

describe("AuthController", () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
    forgotPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("controller object should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("register functionality", () => {
    it("should return the user", async () => {
      const user: SignupUserDto = {
        email: "alexis.carreau16@gmail.com",
        password: "password1234",
        firstName: "Alexis",
        lastName: "Carreau",
      };
      mockAuthService.signup.mockResolvedValue(user);
      expect(await controller.signup(user)).toBe(user);
    });

    it("should return an error to email empty field", async () => {
      const user: SignupUserDto = {
        email: "",
        password: "password1234",
        firstName: "Alexis",
        lastName: "Carreau",
      };
      mockAuthService.signup.mockResolvedValue(user);

      try {
        await controller.signup(user);
      } catch (e) {
        expect(e.message).toBe("Email is required");
      }
    });

    it("should return an error to email invalid field", async () => {
      const user: SignupUserDto = {
        email: "alexis.carreau16",
        password: "password1234",
        firstName: "Alexis",
        lastName: "Carreau",
      };
      mockAuthService.signup.mockResolvedValue(user);

      try {
        await controller.signup(user);
      } catch (e) {
        expect(e.message).toBe("Email is invalid");
      }
    });

    it("should return an error to password empty field", async () => {
      const user: SignupUserDto = {
        email: "alexis.carreau16@gmail.com",
        password: "",
        firstName: "Alexis",
        lastName: "Carreau",
      };
      mockAuthService.signup.mockResolvedValue(user);

      try {
        await controller.signup(user);
      } catch (e) {
        expect(e.message).toBe("Password is required");
      }
    });

    it("should return an error to firstName empty field", async () => {
      const user: SignupUserDto = {
        email: "alexis.carreau16@gmail.com",
        password: "password1234",
        firstName: "",
        lastName: "Carreau",
      };

      mockAuthService.signup.mockResolvedValue(user);

      try {
        await controller.signup(user);
      } catch (e) {
        expect(e.message).toBe("First name is required");
      }
    });

    it("should return an error to lastName empty field", async () => {
      const user: SignupUserDto = {
        email: "alexis.carreau16@gmail.com",
        password: "password1234",
        firstName: "Alexis",
        lastName: "",
      };

      mockAuthService.signup.mockResolvedValue(user);

      try {
        await controller.signup(user);
      } catch (e) {
        expect(e.message).toBe("Last name is required");
      }
    });
  });

  describe("login functionality", () => {
    it("should return the user", async () => {
      const user: LoginUserDto = {
        email: "alexis.carreau16@gmail.com",
        password: "password1234"
      };
      mockAuthService.login.mockResolvedValue(user);
      expect(await controller.login(user)).toBe(user);
    });
  });
});