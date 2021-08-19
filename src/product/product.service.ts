import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IToken } from 'src/interface/users.token';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { Product } from './Entity/product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>
    ) { }


    async createProduct(dto: CreateProductDTO, user: IToken){
        try{
            const create = await this.productRepo.save({...dto, user: user.id})
            if(create) return {message: "create product"}
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
        catch(e){
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }

    async deleteProduct(id: string, user){
        try{
            const deletee = await this.productRepo.delete({user: user.id, id: parseInt(id)})
            if(deletee)  return {message: 'product delete'}
        }
        catch(e){
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }

    async getProductByid(id: string){
        try{
            const data = await this.productRepo.findOne(id)
            return data
        }
        catch(e){
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }

    async getAllProduct(){
        try{
            return this.productRepo.find()
        }
        catch(e){
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }

    async getMyProducts(user: IToken){
        try{
            return await this.productRepo.find({user: user.id})
        }
        catch(e){
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }

    async updateMyProduct(dto: UpdateProductDTO, user){
        try{
            const update = await this.productRepo.update({id: dto.id, user: user.id}, {
                    ...dto
            })
            if(update) return {message: "product update"}
        }
        catch(e){
            throw new HttpException('Server Error', HttpStatus.BAD_GATEWAY);
        }
    }
}
