import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthenticationService } from "../services/authentication.service";
import { VerifyMessageDto } from "../dtos/verify-message.dto";
import { UpdateProfileDto } from "src/dtos/update-profile.dto";
import { AuthBodyDto } from "src/dtos/auth-body.dto";
import { GetProfileDto } from "src/dtos/get-profile.dto";

@Controller("authentication")
export class AuthenticationController {

  constructor(private readonly authenticationService: AuthenticationService) {

  }

  @MessagePattern({
    cmd: 'verify-login-message'
  })
  public async verifyLoginMessage(verifyMessageDTO: VerifyMessageDto): Promise<any> {
    try {
      const response = await this.authenticationService.verifyMessage(verifyMessageDTO);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @MessagePattern({
    cmd: "get-profile-for-doctor"
  })
  public async getDoctorProfileForUser(getProfileDto: GetProfileDto): Promise<any> {
    try {
      const response = await this.authenticationService.getDoctorProfileForUser(getProfileDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @MessagePattern({
    cmd: "get-profile-for-user"
  })
  public async getProfileForUser(getProfileDto: GetProfileDto): Promise<any> {
    try {
      const response = await this.authenticationService.getProfileForUser(getProfileDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @MessagePattern({
    cmd: 'update-user-profile'
  })
  public async updateUserProfile(updateProfileDto: UpdateProfileDto): Promise<any> {
    try {
      const response = await this.authenticationService.updateProfileService(updateProfileDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }


  @MessagePattern({
    cmd: 'update-doctors-profile'
  })
  public async updateDoctorsProfile(updateProfileDto: UpdateProfileDto): Promise<any> {
    try {
      const response = await this.authenticationService.updateDoctorProfileService(updateProfileDto);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @MessagePattern({
    cmd: 'verify-token'
  })
  public async verifyJwtToken(authBodyDto: AuthBodyDto): Promise<any> {
    try {
      const user = await this.authenticationService.verifyToken(authBodyDto.authToken);
      return user;
    } catch (exception) {
      throw exception;
    }
  }
}
