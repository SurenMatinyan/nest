import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body() dto: CreateProductDTO,  @Req() req){
       return this.productService.createProduct(dto, req.user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param("id") id: string, @Req() req){
        return this.productService.deleteProduct(id, req.user)
    }

    @Get('id/:id')
    getProductById(@Param('id') id: string){
      return this.productService.getProductByid(id)
    }

    @Get('all')
    getAllProduct(){
      return this.productService.getAllProduct()
    }

    @Get('myproduct')
    @UseGuards(AuthGuard)
    getMyProduct(@Req() req){
      return this.productService.getMyProducts(req.user)
    }

    @Put()
    @UseGuards(AuthGuard)
    updateProduct(@Body() dto: UpdateProductDTO, @Req() req){
      return this.productService.updateMyProduct(dto, req.user)
    }
}
