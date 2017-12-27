package com.tatvasoft.employeejob.service.mapper;

import com.tatvasoft.employeejob.domain.*;
import com.tatvasoft.employeejob.service.dto.JobDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Job and its DTO JobDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, TaskMapper.class})
public interface JobMapper extends EntityMapper<JobDTO, Job> {

    @Mapping(source = "employee", target = "employeeDto")
    JobDTO toDto(Job job); 

    @Mapping(source = "employeeDto", target = "employee")
    Job toEntity(JobDTO jobDTO);

    default Job fromId(Long id) {
        if (id == null) {
            return null;
        }
        Job job = new Job();
        job.setId(id);
        return job;
    }
}
