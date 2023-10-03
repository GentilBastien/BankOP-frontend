export abstract class AbstractMapper<DTO, ENTITY> {

  public abstract fromDto(dto: DTO): ENTITY;

  public abstract toDto(model: ENTITY): DTO;
}
