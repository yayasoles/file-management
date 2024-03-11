/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FormioService } from '../services/formio.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFormCommand, UpdateFormDataCommand, deleteFormDataCommand } from '../dtos/form.dto';

@Controller('formio')
@ApiTags('Formio')
export class FormioController {
  constructor(private readonly formioService: FormioService) {}

  /**
   * used to save a json representation of the Form to our database
   * @param formData json that describe the form
   * @returns number of affected rows
   */
  @Post('add-local-form')
  async addLocalForm(@Body() command: CreateFormCommand): Promise<any> {
    const result = await this.formioService.addFormData(command);
    return result;
  }
  /**
   * used to update a json representation of the Form to our database
   * @param CreateFormDataCommand
   * @returns number of affected rows
   */
  @Put('update-local-form')
  async updateFormData(@Body() command: UpdateFormDataCommand): Promise<any> {
    const result = await this.formioService.updateFormData(command);
    return result;
  }
  @Delete('softDelete-local-form')
  async softDelete(@Body() command: deleteFormDataCommand): Promise<any> {
    const result = await this.formioService.softDeleteFrom(command.id);
    return result;
  }
  @Put('restore-local-form')
  async restore(@Body() command: deleteFormDataCommand): Promise<any> {
    const result = await this.formioService.restoreFrom(command.id);
    return result;
  }
  @Delete('delete-local-form')
  async deleteFrom(@Body() command: deleteFormDataCommand): Promise<any> {
    const result = await this.formioService.deleteFrom(command.id);
    return result;
  }
  @Get('get-all-local-forms')
  async fetchFormData(): Promise<any> {
    const result = await this.formioService.fetchFormData();
    return result;
  }
  @Get('get-all-local-form-by-name/:name')
  async getAllLocalFormByTag(@Param('name') name: string): Promise<any> {
    const result = await this.formioService.getFormDataByName(name);
    return result;
  }
  @Get('get-local-form-by-id/:id')
  async getLocalFormById(@Param('id') id: string): Promise<any> {
    const result = await this.formioService.getFormDataById(id);
    return result;
  }


    /**
   * get all forms you designed directly from form io and store them to local database
   * @returns all saved formio
   */
    @Get('get-all-forms')
    async getAllForms(): Promise<any> {
      const result = await this.formioService.getFormSchema();
      return result;
    }
    /**
     * get  forms  you designed directly from form io by name and store them to local database
     * @returns all saved formd
     */
    @Get('get-form-by-name/:name')
    async getFormByName(@Param('name') name: string): Promise<any> {
      const result = await this.formioService.getFormByName(name);
      return result;
    }
    @Get('get-form-by-tag-name/:tagName')
    async getFormByTag(@Param('tagName') tagName: string): Promise<any> {
      const result = await this.formioService.getFormByTag(tagName);
      return result;
    }
    /**
     * to be used for getting token from formio so that the token will be used any interaction with formio Apis 
     * @returns access token
     */
    @Post('login')
    async login() {
      const result = await this.formioService.login();
      console.log(result);
      return 'result';
    }
}
