import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthenticationService } from "../services/authentication.service";
import { VerifyMessageDto } from "../dtos/verify-message.dto";

@Controller("authentication")
export class AuthenticationController {

  constructor(private readonly authenticationService: AuthenticationService) {

  }

  @MessagePattern({
    cmd: 'verify-login-message'
  })
  public async verifyLoginMessage(verifyMessageDTO: VerifyMessageDto): Promise<any> {
    try {
      const response = this.authenticationService.verifyMessage(verifyMessageDTO);
      return response;
    } catch (exception) {
      throw exception;
    }
  }
}