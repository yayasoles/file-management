/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import formData from 'form-data';
import { CreateFormCommand, UpdateFormDataCommand } from '../dtos/form.dto';
import { Repository } from 'typeorm';
import { FormEntity } from 'src/entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormioService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
  ) {}

  /**
   * used to get a json representation of the Form in our database
   * @param
   * @returns all forms in our database
   */
  async fetchFormData() {
    try {
      const data = await this.formRepository.find();
      return data;
    } catch (error) {}
  }
  /**
   * used to save a json representation of the Form to our database
   * @param formData json that describe the form
   * @returns number of affected rows
   */
  async addFormData(formData: any) {
    const data = await this.formRepository.insert(formData);
    return data.raw;
  }
  /**
   * used to update a json representation of the Form to our database
   * @param CreateFormDataCommand
   * @returns number of affected rows
   */
  async updateFormData(command: UpdateFormDataCommand) {
    try {
      const data = await this.formRepository.findOne({
        where: { id: command.id },
      });
      data.name = command.name;
      data.design = command.design;
      data.formData = command.formData;
      const res = await this.formRepository.save(data);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async deleteFrom(id: string) {
    try {
      const data = await this.formRepository.delete(id);
      return data.affected > 0 ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async softDeleteFrom(id: string) {
    try {
      const data = await this.formRepository.softDelete(id);
      return data.affected > 0 ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async restoreFrom(id: string) {
    try {
      const data = await this.formRepository.restore(id);
      return data.affected > 0 ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async getFormDataById(formId: string) {
    const result = await this.formRepository.findOne({ where: { id: formId } });
    return result;
  }
  async getFormDataByName(name: string) {
    const result = await this.formRepository.findOne({ where: { name: name } });
    return result;
  }
  async getFormByName(name: string): Promise<any> {
    // to be moved the.env
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZTc3YmM4YzQ5ZGQwNmM3OThkYWU4NiJ9LCJpc3MiOiJodHRwczovL2FwaS5mb3JtLmlvIiwic3ViIjoiNjVlNzdiYzhjNDlkZDA2Yzc5OGRhZTg2IiwianRpIjoiNjVlNzgyZmRiNjkxY2Y4ODFhMWJiMDc3IiwiaWF0IjoxNzA5NjcxMTY1LCJleHAiOjE3NDU5NTkxNjV9.lRrdznFTA9hkECirHzar9TyLagRQk_QGWjSq3V2nFXM';
    const url = `https://mawpuzbjtkixfqn.form.io/form?name=${name}`;
    const config = {
      method: 'get',
      url: url,
      timeout: 200000,
      // to be changed by login api call response
      headers: { 'x-jwt-token': token },
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getFormSchema() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZTc3YmM4YzQ5ZGQwNmM3OThkYWU4NiJ9LCJpc3MiOiJodHRwczovL2FwaS5mb3JtLmlvIiwic3ViIjoiNjVlNzdiYzhjNDlkZDA2Yzc5OGRhZTg2IiwianRpIjoiNjVlNzgyZmRiNjkxY2Y4ODFhMWJiMDc3IiwiaWF0IjoxNzA5NjcxMTY1LCJleHAiOjE3NDU5NTkxNjV9.lRrdznFTA9hkECirHzar9TyLagRQk_QGWjSq3V2nFXM';
    const url = `https://mawpuzbjtkixfqn.form.io/form}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'x-jwt-token': token,
        },
      });
      // save the forms we got to our own database
      const formdata = response.data;
      const createFormCommand = new CreateFormCommand();
      createFormCommand.design = formdata[0];
      createFormCommand.name = formdata[0]?.name;
      const res = await this.formRepository.save(createFormCommand);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getFormByTag(tag: string) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZTc3YmM4YzQ5ZGQwNmM3OThkYWU4NiJ9LCJpc3MiOiJodHRwczovL2FwaS5mb3JtLmlvIiwic3ViIjoiNjVlNzdiYzhjNDlkZDA2Yzc5OGRhZTg2IiwianRpIjoiNjVlNzgyZmRiNjkxY2Y4ODFhMWJiMDc3IiwiaWF0IjoxNzA5NjcxMTY1LCJleHAiOjE3NDU5NTkxNjV9.lRrdznFTA9hkECirHzar9TyLagRQk_QGWjSq3V2nFXM';
    const url = `https://mawpuzbjtkixfqn.form.io/form?tags=${tag}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'x-jwt-token': token,
        },
      });
      // after we get the form from formio we can save it to our local database
      const formdata = response.data;
      const length = formdata?.length;
      const data = [];
      for (let index = 0; index < length; index++) {
        const createFormCommand = new CreateFormCommand();
        createFormCommand.design = formdata[0];
        createFormCommand.name = formdata[0]?.name;
      }
      const res = await this.formRepository.save(data);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async login() {
    const url = 'https://formio.form.io/user/login';
    const body = {
      data: {
        email: 'yayaatsoles@gmail.com',
        password: 'yayasoles@1984',
      },
    };

    try {
      const response = await axios.post(url, body);
      const token = response.headers['x-jwt-token'] + ''; // Access the token from response headers
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
