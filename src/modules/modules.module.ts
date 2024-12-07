import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { ResultsModule } from '@results/results.module';

type NestModuleType =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference;

function getModuleWithPath(
  path: string,
  module: NestModuleType,
): Array<NestModuleType> {
  return [
    module,
    RouterModule.register([
      {
        path,
        module: module as Type<any>,
      },
    ]),
  ];
}

@Module({
  imports: [...getModuleWithPath('results', ResultsModule)],
})
export class ControllerModule {}
